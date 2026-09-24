import { ParamValue } from "next/dist/server/request/params";


export const convertParamToString = (input: ParamValue) => {
    if (!input) return ''

    return Array.isArray(input) ? input[0] : input
} 