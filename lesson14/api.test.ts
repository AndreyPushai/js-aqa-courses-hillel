import axios, {AxiosResponse, AxiosInstance} from "axios";
import qs from "qs";

interface PayloadObject {
    name: string;
    data: object | string;
};

class AxiosHandler {
    protected baseURL: string;
    protected axiosInstance: AxiosInstance;

    constructor(baseURL="https://api.restful-api.dev/objects") {
        this.baseURL = baseURL;
        this.axiosInstance = axios.create({
            baseURL: baseURL,
            validateStatus: function () { return true; }});
    }

    async getAllObjects(): Promise<AxiosResponse> {
        return this.axiosInstance.get("");
    };

    async getObjectById(id: string): Promise<AxiosResponse> {
        return this.axiosInstance.get(`${id}`)
    };

    async getObjectsByIds(...ids: string[]): Promise<AxiosResponse> {
        return this.axiosInstance.get("", {
            params: {id: ids},
            paramsSerializer: function (params) {
                return qs.stringify(params, {arrayFormat: 'repeat'})
            },
        })
    };
    async postAddObject(data: PayloadObject | null): Promise<AxiosResponse> {
        return this.axiosInstance.post(``, data);
    };

    async putUpdateObject(id: string, data: object): Promise<AxiosResponse> {
        return this.axiosInstance.put(`/${id}`, data);
    };

    async patchUpdateObject(id: string, data: object): Promise<AxiosResponse> {
        return this.axiosInstance.patch(`/${id}`, data);
    };

    async deleteObject(id: string): Promise<AxiosResponse> {
        return this.axiosInstance.delete(`/${id}`);
    };
};

describe("Get objects tests", () => {
    const axiosHandler = new AxiosHandler();

    test("GET: Verify all objects returned", async () => {
        const response = await axiosHandler.getAllObjects();
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
        const response = await axiosHandler.getObjectsByIds("3", "5", "10");
        expect(response.status).toBe(200);
        expect(response.data).toEqual(expect.arrayContaining(expectedObjects));
    });
});

describe("Create, read, update, delete object", () => {

    const axiosHandler = new AxiosHandler();

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

    let createdObjectResponse: AxiosResponse;
    let createdObjectID: string;

    beforeAll(async () => {

        createdObjectResponse = await axiosHandler.postAddObject(payload1);
        createdObjectID = createdObjectResponse.data.id;
    });

    test("POST: Verify object created", async () => {
        expect(createdObjectResponse.status).toBe(200);
        expect(createdObjectResponse.data.id).toBeDefined();
        expect(createdObjectResponse.data.createdAt).toBeDefined();
        expect(createdObjectResponse.data).toMatchObject(payload1);
    });

    test("GET: Verify user can get created object by ID", async () => {
        const response = await axiosHandler.getObjectById(createdObjectID);
        expect(response.status).toBe(200);
        expect(response.data.id).toBe(createdObjectID);
        expect(response.data).toMatchObject(payload1);
    });

    test("PUT: Verify user can update created object", async () => {
        const response = await axiosHandler.putUpdateObject(createdObjectID, payload2);
        expect(response.status).toBe(200);
        expect(response.data.id).toBe(createdObjectID);
        expect(response.data.updatedAt).toBeDefined();
        expect(response.data).toMatchObject(payload2);
    });

    test("PATCH: Verify user can patch object", async () => {
        const response = await axiosHandler.patchUpdateObject(createdObjectID, payload3);
        expect(response.status).toBe(200);
        expect(response.data.id).toBe(createdObjectID);
        expect(response.data.updatedAt).toBeDefined();
        expect(response.data).toMatchObject(payload3);
    });

    test("DELETE: Verify user can delete created object", async () => {
        const response = await axiosHandler.deleteObject(createdObjectID);
        expect(response.status).toBe(200);
        expect(response.data.message).toBe(`Object with id = ${createdObjectID} has been deleted.`);
    });
});

describe("Negative checks", () => {

    const axiosHandler = new AxiosHandler();

    test("GET: Test invalid /items path", async () => {
        const axiosHandler = new AxiosHandler("https://api.restful-api.dev/items");
        const response = await axiosHandler.getAllObjects();
        
        expect(response.status).toBe(404);
        expect(response.data.error).toBe("Not Found");
        expect(response.data.timestamp).toBeDefined();
        expect(response.data.path).toBe("/items");
    });

    test("GET: Test invalid objects ids return an empty array", async () => {
        const response = await axiosHandler.getObjectsByIds("test", "asdf", "copy");

        expect(response.status).toBe(200);
        expect(response.data).toEqual([]);
    });

    test("GET: Test invalid object id", async () => {
        const id = "test";
        const response = await axiosHandler.getObjectById(id);
        expect(response.status).toBe(404);
        // They have a typo in text Oject LOL.
        expect(response.data.error).toBe(`Oject with id=${id} was not found.`);
    });

    test("POST: Test system doesn't accept null data", async () => {
        const response = await axiosHandler.postAddObject(null);
        expect(response.status).toBe(415);
        expect(response.data.error).toContain("415 Unsupported Media Type");
    });

    test("PUT: Test update reserved object", async () => {
        const response = await axiosHandler.putUpdateObject("1", {});
        expect(response.status).toBe(405);
        expect(response.data.error).toContain("1 is a reserved id");
    });

    test("PATCH: Test update reserved object", async () => {
        const response = await axiosHandler.patchUpdateObject("1", {});
        expect(response.status).toBe(405);
        expect(response.data.error).toContain("1 is a reserved id");
    });
    
    test("DELETE: Test delete object with invalid id", async () => {
        const id = "test";
        const response = await axiosHandler.deleteObject(id);
        expect(response.status).toBe(404);
        expect(response.data.error).toBe(`Object with id = ${id} doesn't exist.`);
    });
});
