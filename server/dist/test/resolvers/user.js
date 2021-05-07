"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphqlCall_1 = require("../graphqlCall");
const testConnection_1 = require("../testConnection");
let connection;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield testConnection_1.testConnection();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield connection.close();
}));
const createUserMutation = `
    mutation createUser($data: CreateUserInput!) {
        createUser(data: $data) {
            id
            username
            email
            password
        }
    }
`;
describe('UserResolverのテスト', () => {
    it('create user', () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(yield graphqlCall_1.graphqlCall({
            source: createUserMutation,
            variableValues: {
                data: {
                    username: 'taisuke',
                    email: 'test@gmail.com',
                    password: 'test',
                    confirmPassword: 'test',
                },
            },
        }));
    }));
});
//# sourceMappingURL=user.js.map