import axios, {AxiosResponse, AxiosInstance} from "axios";
import qs from "qs";

interface PayloadObject {
    name: string;
    data: object | string;
};

const axiosInstance: AxiosInstance = axios.create({
    baseURL: "https://api.restful-api.dev/objects",
});

async function getAllObjects(): Promise<AxiosResponse> {
    return axiosInstance.get("");
};

async function getObjectById(id: string): Promise<AxiosResponse> {
    return axiosInstance.get(`${id}`)
};

async function getObjectsByIds(...ids: string[]): Promise<AxiosResponse> {
    return axiosInstance.get("", {
        params: {id: ids},
        paramsSerializer: function (params) {
            return qs.stringify(params, {arrayFormat: 'repeat'})
        },
    })
};

async function postAddObject(data: PayloadObject): Promise<AxiosResponse> {
    return axiosInstance.post(``, data);
};

async function putUpdateObject(id: string, data: object): Promise<AxiosResponse> {
    return axiosInstance.put(`/${id}`, data);
};

async function patchUpdateObject(id: string, data: object): Promise<AxiosResponse> {
    return axiosInstance.patch(`/${id}`, data);
};

async function deleteObject(id: string): Promise<AxiosResponse> {
    return axiosInstance.delete(`/${id}`);
};

describe("Get objects tests", () => {
    test("GET: Verify all objects returned", async () => {
        const response = await getAllObjects();
        expect(response.status).toBe(200);
        expect(response.data).toBeDefined();
    });

    test("GET: Verify several object returned", async () => {

        const expectedObjects = [
            {
                id: "3",
                name: "Apple iPhone 12 Pro Max",
                data: { "color": "Cloudy White", "capacity GB": 512 }
            },
            {
                id: "5",
                name: "Samsung Galaxy Z Fold2",
                data: { "price": 689.99, "color": "Brown" }
            },
            {
                id: "10",
                name: "Apple iPad Mini 5th Gen",
                data: { "Capacity": "64 GB", "Screen size": 7.9 }
            }
        ];
        const response = await getObjectsByIds("3", "5", "10");
        expect(response.status).toBe(200);
        expect(response.data).toEqual(expect.arrayContaining(expectedObjects));
    });
});

describe("Create, read, update, delete object", () => {

    const payload1: PayloadObject = {
        name: "Google Pixel 9",
        data: {
           "year": 2024,
           "price": 749.99,
           "color": "Obsidian",
           "capacity": "256 GB"
        }
    };

    const payload2: PayloadObject = {
        name: "Google Pixel 9 (UPD)",
        data: {
           "year": 2024,
           "price": 649.99,
           "color": "Wintergreen",
           "capacity": "256 GB"
        }
    };

    const payload3: PayloadObject = {
        "name": "test",
        "data": "test",
    };

    let createdObjectResponse: any;
    let createdObjectID: string;

    beforeAll(async () => {

        createdObjectResponse = await postAddObject(payload1);
        createdObjectID = createdObjectResponse.data.id;
    });

    test("POST: Verify object created", async () => {
        expect(createdObjectResponse.status).toBe(200);
        expect(createdObjectResponse.data.id).toBeDefined();
        expect(createdObjectResponse.data.createdAt).toBeDefined();
        expect(createdObjectResponse.data).toMatchObject(payload1);
    });

    test("GET: Verify user can get created object by ID", async () => {
        const response = await getObjectById(createdObjectID);
        expect(response.status).toBe(200);
        expect(response.data.id).toBe(createdObjectID);
        expect(response.data).toMatchObject(payload1);
    });

    test("PUT: Verify user can update created object", async () => {
        const response = await putUpdateObject(createdObjectID, payload2);
        expect(response.status).toBe(200);
        expect(response.data.id).toBe(createdObjectID);
        expect(response.data.updatedAt).toBeDefined();
        expect(response.data).toMatchObject(payload2);
    });

    test("PATCH: Verify user can patch object", async () => {
        const response = await patchUpdateObject(createdObjectID, payload3);
        expect(response.status).toBe(200);
        expect(response.data.id).toBe(createdObjectID);
        expect(response.data.updatedAt).toBeDefined();
        expect(response.data).toMatchObject(payload3);
    });

    test("DELETE: Verify user can delete created object", async () => {
        const response = await deleteObject(createdObjectID);
        expect(response.status).toBe(200);
        expect(response.data.message).toBe(`Object with id = ${createdObjectID} has been deleted.`);
    });
});
