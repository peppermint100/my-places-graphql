"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
require("reflect-metadata");
const createSchema_1 = require("./util/createSchema");
const db_1 = require("./config/db");
const typeorm_1 = require("typeorm");
const connect_redis_1 = __importDefault(require("connect-redis"));
const express_session_1 = __importDefault(require("express-session"));
const redis_1 = require("./util/redis");
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(db_1.dbOptions);
        yield typeorm_1.createConnection(db_1.dbOptions).then((conn) => __awaiter(this, void 0, void 0, function* () {
            console.log('db connected.. : ', conn);
        })).catch((err) => {
            console.log("DB ERROR :", err);
        });
        const schema = yield createSchema_1.createSchema();
        const apolloServer = new apollo_server_express_1.ApolloServer({
            schema,
            context: ({ req }) => ({ req })
        });
        const app = express_1.default();
        const RedisStore = connect_redis_1.default(express_session_1.default);
        app.use(express_1.default.json());
        app.use(express_session_1.default({
            store: new RedisStore({
                client: redis_1.redis
            }),
            name: "qid",
            secret: config_1.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: false,
                maxAge: 1000 * 60 * 5
            }
        }));
        app.use(cors_1.default({
            credentials: true,
            origin: process.env.CLIENT || "http://localhost:3000",
        }));
        apolloServer.applyMiddleware({ app, cors: false });
        app.listen(config_1.PORT, () => {
            console.log(`GraphQL Server Started On Port ${config_1.PORT}`);
        });
    });
}
init();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL21udC9jL1VzZXJzL2x0Z3lhL3dvcmsvcHJvamVjdHMvbXktcGxhY2VzLWdyYXBocWwvc2VydmVyL3NyYy9zZXJ2ZXIudHMiLCJzb3VyY2VzIjpbIi9tbnQvYy9Vc2Vycy9sdGd5YS93b3JrL3Byb2plY3RzL215LXBsYWNlcy1ncmFwaHFsL3NlcnZlci9zcmMvc2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxpRUFBb0Q7QUFDcEQsc0RBQTZCO0FBQzdCLGdEQUF1QjtBQUN2QixxQ0FBK0M7QUFDL0MsNEJBQXlCO0FBQ3pCLHNEQUFrRDtBQUNsRCxvQ0FBdUM7QUFDdkMscUNBQTBDO0FBQzFDLGtFQUF3QztBQUN4QyxzRUFBcUM7QUFDckMsd0NBQW9DO0FBRXBDLFNBQWUsSUFBSTs7UUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQVMsQ0FBQyxDQUFBO1FBQ3RCLE1BQU0sMEJBQWdCLENBQUMsY0FBUyxDQUFDLENBQUMsSUFBSSxDQUFFLENBQU0sSUFBSSxFQUFDLEVBQUU7WUFDakQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUUsQ0FBQTtRQUMzQyxDQUFDLENBQUEsQ0FBQyxDQUFDLEtBQUssQ0FBRSxDQUFDLEdBQVEsRUFBRSxFQUFFO1lBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ2xDLENBQUMsQ0FBQyxDQUFBO1FBRUYsTUFBTSxNQUFNLEdBQUcsTUFBTSwyQkFBWSxFQUFFLENBQUE7UUFDbkMsTUFBTSxZQUFZLEdBQUcsSUFBSSxvQ0FBWSxDQUFDO1lBQ2xDLE1BQU07WUFDTixPQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7U0FDdkMsQ0FBQyxDQUFBO1FBRUYsTUFBTSxHQUFHLEdBQUcsaUJBQU8sRUFBRSxDQUFBO1FBRXJCLE1BQU0sVUFBVSxHQUFHLHVCQUFZLENBQUMseUJBQU8sQ0FBQyxDQUFBO1FBRXhDLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1FBQ3ZCLEdBQUcsQ0FBQyxHQUFHLENBQUMseUJBQU8sQ0FBQztZQUNaLEtBQUssRUFBRSxJQUFJLFVBQVUsQ0FBQztnQkFDbEIsTUFBTSxFQUFFLGFBQUs7YUFDaEIsQ0FBQztZQUNGLElBQUksRUFBRSxLQUFLO1lBQ1gsTUFBTSxFQUFFLHVCQUFjO1lBQ3RCLE1BQU0sRUFBRSxLQUFLO1lBQ2IsaUJBQWlCLEVBQUUsS0FBSztZQUN4QixNQUFNLEVBQUU7Z0JBRUosTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsTUFBTSxFQUFFLElBQUksR0FBRyxFQUFFLEdBQUcsQ0FBQzthQUN4QjtTQUNKLENBQUMsQ0FBQyxDQUFBO1FBRUgsR0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFJLENBQUM7WUFDVCxXQUFXLEVBQUUsSUFBSTtZQUNqQixNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksdUJBQXVCO1NBQ3hELENBQUMsQ0FBQyxDQUFBO1FBRUgsWUFBWSxDQUFDLGVBQWUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTtRQUVsRCxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQUksRUFBRSxHQUFHLEVBQUU7WUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsYUFBSSxFQUFFLENBQUMsQ0FBQTtRQUN6RCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7Q0FBQTtBQUVELElBQUksRUFBRSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBvbGxvU2VydmVyIH0gZnJvbSBcImFwb2xsby1zZXJ2ZXItZXhwcmVzc1wiXG5pbXBvcnQgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiXG5pbXBvcnQgY29ycyBmcm9tIFwiY29yc1wiXG5pbXBvcnQgeyBQT1JULCBTRVNTSU9OX1NFQ1JFVCB9IGZyb20gXCIuL2NvbmZpZ1wiXG5pbXBvcnQgXCJyZWZsZWN0LW1ldGFkYXRhXCJcbmltcG9ydCB7IGNyZWF0ZVNjaGVtYSB9IGZyb20gXCIuL3V0aWwvY3JlYXRlU2NoZW1hXCJcbmltcG9ydCB7IGRiT3B0aW9ucyB9IGZyb20gXCIuL2NvbmZpZy9kYlwiXG5pbXBvcnQgeyBjcmVhdGVDb25uZWN0aW9uIH0gZnJvbSBcInR5cGVvcm1cIlxuaW1wb3J0IGNvbm5lY3RSZWRpcyBmcm9tIFwiY29ubmVjdC1yZWRpc1wiXG5pbXBvcnQgc2Vzc2lvbiBmcm9tIFwiZXhwcmVzcy1zZXNzaW9uXCJcbmltcG9ydCB7IHJlZGlzIH0gZnJvbSBcIi4vdXRpbC9yZWRpc1wiXG5cbmFzeW5jIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgY29uc29sZS5sb2coZGJPcHRpb25zKVxuICAgIGF3YWl0IGNyZWF0ZUNvbm5lY3Rpb24oZGJPcHRpb25zKS50aGVuKCBhc3luYyBjb25uID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ2RiIGNvbm5lY3RlZC4uIDogJywgY29ubiApXG4gICAgfSkuY2F0Y2goIChlcnI6IGFueSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkRCIEVSUk9SIDpcIiAsZXJyKVxuICAgIH0pXG5cbiAgICBjb25zdCBzY2hlbWEgPSBhd2FpdCBjcmVhdGVTY2hlbWEoKVxuICAgIGNvbnN0IGFwb2xsb1NlcnZlciA9IG5ldyBBcG9sbG9TZXJ2ZXIoe1xuICAgICAgICBzY2hlbWEsXG4gICAgICAgIGNvbnRleHQ6ICh7IHJlcSB9OiBhbnkpID0+ICh7IHJlcSB9KVxuICAgIH0pXG5cbiAgICBjb25zdCBhcHAgPSBleHByZXNzKClcblxuICAgIGNvbnN0IFJlZGlzU3RvcmUgPSBjb25uZWN0UmVkaXMoc2Vzc2lvbilcblxuICAgIGFwcC51c2UoZXhwcmVzcy5qc29uKCkpXG4gICAgYXBwLnVzZShzZXNzaW9uKHtcbiAgICAgICAgc3RvcmU6IG5ldyBSZWRpc1N0b3JlKHtcbiAgICAgICAgICAgIGNsaWVudDogcmVkaXNcbiAgICAgICAgfSksXG4gICAgICAgIG5hbWU6IFwicWlkXCIsXG4gICAgICAgIHNlY3JldDogU0VTU0lPTl9TRUNSRVQsXG4gICAgICAgIHJlc2F2ZTogZmFsc2UsXG4gICAgICAgIHNhdmVVbmluaXRpYWxpemVkOiBmYWxzZSxcbiAgICAgICAgY29va2llOiB7XG4gICAgICAgICAgICAvLyBodHRwT25seTogdHJ1ZSxcbiAgICAgICAgICAgIHNlY3VyZTogZmFsc2UsIC8vIGlmIHRydXRoeSwgb25seSBleGNlcHRzIGh0dHBzXG4gICAgICAgICAgICBtYXhBZ2U6IDEwMDAgKiA2MCAqIDVcbiAgICAgICAgfVxuICAgIH0pKVxuXG4gICAgYXBwLnVzZShjb3JzKHtcbiAgICAgICAgY3JlZGVudGlhbHM6IHRydWUsXG4gICAgICAgIG9yaWdpbjogcHJvY2Vzcy5lbnYuQ0xJRU5UIHx8IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwXCIsXG4gICAgfSkpXG5cbiAgICBhcG9sbG9TZXJ2ZXIuYXBwbHlNaWRkbGV3YXJlKHsgYXBwLCBjb3JzOiBmYWxzZSB9KVxuXG4gICAgYXBwLmxpc3RlbihQT1JULCAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBHcmFwaFFMIFNlcnZlciBTdGFydGVkIE9uIFBvcnQgJHtQT1JUfWApXG4gICAgfSlcbn1cblxuaW5pdCgpXG5cbiJdfQ==