import { Err, Ok } from "./core/result.js";
import { None, Some } from "./core/option";
function toResult(du) {
    if (du.success) {
        return Ok(du.data);
    }
    return Err(du.error);
}
function parseJSON(raw) {
    try {
        const json = JSON.parse(raw);
        return Ok(json);
    }
    catch (e) {
        return Err(e);
    }
}
function catchToResult(e) {
    if (e instanceof Error) {
        return e;
    }
    else if (typeof e === "string") {
        return new Error(e);
    }
    return new Error(JSON.stringify(e));
}
function stringToOption(s) {
    if (s == null) {
        return None();
    }
    return s.length === 0 ? None() : Some(s);
}
export { toResult, parseJSON, catchToResult, stringToOption };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBVSxNQUFNLGtCQUFrQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxJQUFJLEVBQVUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5ELFNBQVMsUUFBUSxDQUNmLEVBQW9FO0lBRXBFLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRTtRQUNkLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNwQjtJQUNELE9BQU8sR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN2QixDQUFDO0FBRUQsU0FBUyxTQUFTLENBQUksR0FBVztJQUMvQixJQUFJO1FBQ0YsTUFBTSxJQUFJLEdBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNqQjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxHQUFHLENBQUMsQ0FBVSxDQUFDLENBQUM7S0FDeEI7QUFDSCxDQUFDO0FBRUQsU0FBUyxhQUFhLENBQUMsQ0FBVTtJQUMvQixJQUFJLENBQUMsWUFBWSxLQUFLLEVBQUU7UUFDdEIsT0FBTyxDQUFDLENBQUM7S0FDVjtTQUFNLElBQUksT0FBTyxDQUFDLEtBQUssUUFBUSxFQUFFO1FBQ2hDLE9BQU8sSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDckI7SUFDRCxPQUFPLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN0QyxDQUFDO0FBRUQsU0FBUyxjQUFjLENBQUMsQ0FBNEI7SUFDbEQsSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFO1FBQ2IsT0FBTyxJQUFJLEVBQUUsQ0FBQztLQUNmO0lBQ0QsT0FBTyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMzQyxDQUFDO0FBRUQsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgWm9kRXJyb3IgfSBmcm9tIFwiem9kXCI7XG5pbXBvcnQgeyBFcnIsIE9rLCBSZXN1bHQgfSBmcm9tIFwiLi9jb3JlL3Jlc3VsdC5qc1wiO1xuaW1wb3J0IHsgTm9uZSwgT3B0aW9uLCBTb21lIH0gZnJvbSBcIi4vY29yZS9vcHRpb25cIjtcblxuZnVuY3Rpb24gdG9SZXN1bHQ8VD4oXG4gIGR1OiB7IHN1Y2Nlc3M6IHRydWU7IGRhdGE6IFQgfSB8IHsgc3VjY2VzczogZmFsc2U7IGVycm9yOiBab2RFcnJvciB9XG4pOiBSZXN1bHQ8VCwgWm9kRXJyb3I+IHtcbiAgaWYgKGR1LnN1Y2Nlc3MpIHtcbiAgICByZXR1cm4gT2soZHUuZGF0YSk7XG4gIH1cbiAgcmV0dXJuIEVycihkdS5lcnJvcik7XG59XG5cbmZ1bmN0aW9uIHBhcnNlSlNPTjxUPihyYXc6IHN0cmluZyk6IFJlc3VsdDxULCBFcnJvcj4ge1xuICB0cnkge1xuICAgIGNvbnN0IGpzb246IFQgPSBKU09OLnBhcnNlKHJhdyk7XG4gICAgcmV0dXJuIE9rKGpzb24pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIEVycihlIGFzIEVycm9yKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjYXRjaFRvUmVzdWx0KGU6IHVua25vd24pOiBFcnJvciB7XG4gIGlmIChlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICByZXR1cm4gZTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZSA9PT0gXCJzdHJpbmdcIikge1xuICAgIHJldHVybiBuZXcgRXJyb3IoZSk7XG4gIH1cbiAgcmV0dXJuIG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeShlKSk7XG59XG5cbmZ1bmN0aW9uIHN0cmluZ1RvT3B0aW9uKHM6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQpOiBPcHRpb248c3RyaW5nPiB7XG4gIGlmIChzID09IG51bGwpIHtcbiAgICByZXR1cm4gTm9uZSgpO1xuICB9XG4gIHJldHVybiBzLmxlbmd0aCA9PT0gMCA/IE5vbmUoKSA6IFNvbWUocyk7XG59XG5cbmV4cG9ydCB7IHRvUmVzdWx0LCBwYXJzZUpTT04sIGNhdGNoVG9SZXN1bHQsIHN0cmluZ1RvT3B0aW9uIH07XG4iXX0=