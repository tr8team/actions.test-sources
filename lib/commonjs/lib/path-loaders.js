import { None, Some } from "./core/option";
import { Ok } from "./core/result";
class PathLoaders {
    #json;
    #type;
    #validator;
    #mapper;
    constructor(json, type, validator, mapper) {
        this.#json = json;
        this.#type = type;
        this.#validator = validator;
        this.#mapper = mapper;
    }
    load({ name, url, path, type }) {
        if (type === this.#type) {
            return this.#json
                .load(path, Some(this.#validator))
                .map((data) => Some(this.#mapper.map(name, url, data)));
        }
        return Ok(None());
    }
}
export { PathLoaders };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aC1sb2FkZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9wYXRoLWxvYWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsT0FBTyxFQUFFLElBQUksRUFBVSxJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLEVBQUUsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUszQyxNQUFNLFdBQVc7SUFDTixLQUFLLENBQVM7SUFDZCxLQUFLLENBQVU7SUFDZixVQUFVLENBQWU7SUFDekIsT0FBTyxDQUFrQjtJQUVsQyxZQUNFLElBQVksRUFDWixJQUFhLEVBQ2IsU0FBdUIsRUFDdkIsTUFBdUI7UUFFdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBVTtRQUNwQyxJQUFJLElBQUksS0FBSyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ3ZCLE9BQU8sSUFBSSxDQUFDLEtBQUs7aUJBQ2QsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUNqQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMzRDtRQUNELE9BQU8sRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDcEIsQ0FBQztDQUNGO0FBRUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9hZGVyIH0gZnJvbSBcIi4vaW50ZXJmYWNlL2xvYWRlclwiO1xuaW1wb3J0IHsgQ29uZmlnLCBMb2FkZXJzIH0gZnJvbSBcIi4vaW5wdXRcIjtcbmltcG9ydCB7IE91dHB1dCB9IGZyb20gXCIuL291dHB1dFwiO1xuaW1wb3J0IHsgTm9uZSwgT3B0aW9uLCBTb21lIH0gZnJvbSBcIi4vY29yZS9vcHRpb25cIjtcbmltcG9ydCB7IE9rLCBSZXN1bHQgfSBmcm9tIFwiLi9jb3JlL3Jlc3VsdFwiO1xuaW1wb3J0IHsgU291cmNlIH0gZnJvbSBcIi4vaW50ZXJmYWNlL2ZpbGUtbG9hZGVyXCI7XG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tIFwiLi9pbnRlcmZhY2UvdmFsaWRhdG9yXCI7XG5pbXBvcnQgeyBTb3VyY2VNYXBwZXIgfSBmcm9tIFwiLi9pbnRlcmZhY2Uvc291cmNlLW1hcHBlclwiO1xuXG5jbGFzcyBQYXRoTG9hZGVyczxUPiBpbXBsZW1lbnRzIExvYWRlciB7XG4gIHJlYWRvbmx5ICNqc29uOiBTb3VyY2U7XG4gIHJlYWRvbmx5ICN0eXBlOiBMb2FkZXJzO1xuICByZWFkb25seSAjdmFsaWRhdG9yOiBWYWxpZGF0b3I8VD47XG4gIHJlYWRvbmx5ICNtYXBwZXI6IFNvdXJjZU1hcHBlcjxUPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBqc29uOiBTb3VyY2UsXG4gICAgdHlwZTogTG9hZGVycyxcbiAgICB2YWxpZGF0b3I6IFZhbGlkYXRvcjxUPixcbiAgICBtYXBwZXI6IFNvdXJjZU1hcHBlcjxUPlxuICApIHtcbiAgICB0aGlzLiNqc29uID0ganNvbjtcbiAgICB0aGlzLiN0eXBlID0gdHlwZTtcbiAgICB0aGlzLiN2YWxpZGF0b3IgPSB2YWxpZGF0b3I7XG4gICAgdGhpcy4jbWFwcGVyID0gbWFwcGVyO1xuICB9XG5cbiAgbG9hZCh7IG5hbWUsIHVybCwgcGF0aCwgdHlwZSB9OiBDb25maWcpOiBSZXN1bHQ8T3B0aW9uPE91dHB1dD4sIEVycm9yPiB7XG4gICAgaWYgKHR5cGUgPT09IHRoaXMuI3R5cGUpIHtcbiAgICAgIHJldHVybiB0aGlzLiNqc29uXG4gICAgICAgIC5sb2FkKHBhdGgsIFNvbWUodGhpcy4jdmFsaWRhdG9yKSlcbiAgICAgICAgLm1hcCgoZGF0YSkgPT4gU29tZSh0aGlzLiNtYXBwZXIubWFwKG5hbWUsIHVybCwgZGF0YSkpKTtcbiAgICB9XG4gICAgcmV0dXJuIE9rKE5vbmUoKSk7XG4gIH1cbn1cblxuZXhwb3J0IHsgUGF0aExvYWRlcnMgfTtcbiJdfQ==