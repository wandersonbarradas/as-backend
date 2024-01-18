import { Prisma, PrismaClient } from "@prisma/client";
import * as groups from "../services/groups";
const prisma = new PrismaClient();

type GetAllFilter = { id_group?: number; id_event: number };

export const getAll = async (filters: GetAllFilter) => {
    try {
        return await prisma.eventPeople.findMany({ where: filters });
    } catch (error) {
        return false;
    }
};
type GetOneFilter = {
    id?: number;
    id_event: number;
    id_group?: number;
    cpf?: string;
};
export const getOne = async (filters: GetOneFilter) => {
    try {
        if (!filters.id && !filters.cpf) return false;
        return await prisma.eventPeople.findFirst({ where: filters });
    } catch (error) {
        return false;
    }
};

type PeopleCreateData = Prisma.Args<
    typeof prisma.eventPeople,
    "create"
>["data"];
export const add = async (data: PeopleCreateData) => {
    try {
        if (!data.id_group) return false;
        const group = await groups.getOne({
            id_event: data.id_event,
            id: data.id_group,
        });
        if (!group) return false;
        return await prisma.eventPeople.create({ data });
    } catch (error) {
        return false;
    }
};

type PeopleUpdateData = Prisma.Args<
    typeof prisma.eventPeople,
    "update"
>["data"];
type UpdateFilters = { id?: number; id_event: number; id_group?: number };
export const update = async (
    filters: UpdateFilters,
    data: PeopleUpdateData,
) => {
    try {
        return await prisma.eventPeople.updateMany({ where: filters, data });
    } catch (error) {
        return false;
    }
};
type DeleteFilters = { id: number; id_event?: number; id_group?: number };
export const remove = async (filters: DeleteFilters) => {
    try {
        return await prisma.eventPeople.delete({ where: filters });
    } catch (error) {
        console.log("🚀 ~ remove ~ error:", error);
        return false;
    }
};
