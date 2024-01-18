import { PrismaClient, Prisma } from "@prisma/client";
import * as events from "./events";
import * as people from "./people";
const prisma = new PrismaClient();

export const getAll = async (id_event: number) => {
    try {
        return await prisma.eventGroup.findMany({ where: { id_event } });
    } catch (error) {
        return false;
    }
};

type GetOneFilters = { id_event?: number; id: number };
export const getOne = async (filters: GetOneFilters) => {
    try {
        return await prisma.eventGroup.findFirst({ where: filters });
    } catch (error) {
        return false;
    }
};

type GroupsCreateData = Prisma.Args<typeof prisma.eventGroup, "create">["data"];
export const add = async (data: GroupsCreateData) => {
    try {
        if (!data.id_event) return false;
        const event = await events.getOne(data.id_event);
        if (!event) return false;
        return await prisma.eventGroup.create({ data });
    } catch (error) {
        return false;
    }
};

type UpdateFilters = { id: number; id_event?: number };
type GroupsUpdateData = Prisma.Args<typeof prisma.eventGroup, "update">["data"];
export const update = async (
    filters: UpdateFilters,
    data: GroupsUpdateData,
) => {
    try {
        return await prisma.eventGroup.update({ where: filters, data });
    } catch (error) {
        return false;
    }
};

type DeleteFilters = {
    id: number;
    id_event: number;
};

export const remove = async (filters: DeleteFilters) => {
    try {
        const groupPeople = await people.getAll({
            id_event: filters.id_event,
            id_group: filters.id,
        });
        if (!groupPeople) return false;
        for (let i in groupPeople) {
            await people.remove({
                id_event: filters.id_event,
                id_group: filters.id,
                id: groupPeople[i].id,
            });
        }
        return await prisma.eventGroup.delete({ where: filters });
    } catch (error) {
        console.log("🚀 ~ remove ~ error:", error);
        return false;
    }
};
