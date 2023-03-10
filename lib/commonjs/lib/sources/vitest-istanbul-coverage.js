import { number, object } from "zod";
const vitestIstanbulCoverage = object({
    total: object({
        lines: object({
            pct: number().min(0).max(100),
        }).required(),
        statements: object({
            pct: number().min(0).max(100),
        }).required(),
        functions: object({
            pct: number().min(0).max(100),
        }).required(),
        branches: object({
            pct: number().min(0).max(100),
        }).required(),
    }).required(),
}).required();
export { vitestIstanbulCoverage };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidml0ZXN0LWlzdGFuYnVsLWNvdmVyYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9zb3VyY2VzL3ZpdGVzdC1pc3RhbmJ1bC1jb3ZlcmFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBSyxNQUFNLEtBQUssQ0FBQztBQUV4QyxNQUFNLHNCQUFzQixHQUFHLE1BQU0sQ0FBQztJQUNwQyxLQUFLLEVBQUUsTUFBTSxDQUFDO1FBQ1osS0FBSyxFQUFFLE1BQU0sQ0FBQztZQUNaLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztTQUM5QixDQUFDLENBQUMsUUFBUSxFQUFFO1FBQ2IsVUFBVSxFQUFFLE1BQU0sQ0FBQztZQUNqQixHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7U0FDOUIsQ0FBQyxDQUFDLFFBQVEsRUFBRTtRQUNiLFNBQVMsRUFBRSxNQUFNLENBQUM7WUFDaEIsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO1NBQzlCLENBQUMsQ0FBQyxRQUFRLEVBQUU7UUFDYixRQUFRLEVBQUUsTUFBTSxDQUFDO1lBQ2YsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO1NBQzlCLENBQUMsQ0FBQyxRQUFRLEVBQUU7S0FDZCxDQUFDLENBQUMsUUFBUSxFQUFFO0NBQ2QsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBSWQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBudW1iZXIsIG9iamVjdCwgeiB9IGZyb20gXCJ6b2RcIjtcblxuY29uc3Qgdml0ZXN0SXN0YW5idWxDb3ZlcmFnZSA9IG9iamVjdCh7XG4gIHRvdGFsOiBvYmplY3Qoe1xuICAgIGxpbmVzOiBvYmplY3Qoe1xuICAgICAgcGN0OiBudW1iZXIoKS5taW4oMCkubWF4KDEwMCksXG4gICAgfSkucmVxdWlyZWQoKSxcbiAgICBzdGF0ZW1lbnRzOiBvYmplY3Qoe1xuICAgICAgcGN0OiBudW1iZXIoKS5taW4oMCkubWF4KDEwMCksXG4gICAgfSkucmVxdWlyZWQoKSxcbiAgICBmdW5jdGlvbnM6IG9iamVjdCh7XG4gICAgICBwY3Q6IG51bWJlcigpLm1pbigwKS5tYXgoMTAwKSxcbiAgICB9KS5yZXF1aXJlZCgpLFxuICAgIGJyYW5jaGVzOiBvYmplY3Qoe1xuICAgICAgcGN0OiBudW1iZXIoKS5taW4oMCkubWF4KDEwMCksXG4gICAgfSkucmVxdWlyZWQoKSxcbiAgfSkucmVxdWlyZWQoKSxcbn0pLnJlcXVpcmVkKCk7XG5cbnR5cGUgVml0ZXN0SXN0YW5idWxDb3ZlcmFnZSA9IHouaW5mZXI8dHlwZW9mIHZpdGVzdElzdGFuYnVsQ292ZXJhZ2U+O1xuXG5leHBvcnQgeyB2aXRlc3RJc3RhbmJ1bENvdmVyYWdlIH07XG5leHBvcnQgdHlwZSB7IFZpdGVzdElzdGFuYnVsQ292ZXJhZ2UgfTtcbiJdfQ==