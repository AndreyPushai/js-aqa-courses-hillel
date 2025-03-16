import axios, {AxiosResponse, AxiosInstance} from "axios";

interface ResponseObject {
    id: string,
    name: string,
    data: object,
};

const axiosInstance: AxiosInstance = axios.create({
    baseURL: "https://api.restful-api.dev/objects",
});

async function getAllObjects(): Promise<ResponseObject[]> {
    const response: AxiosResponse = await axiosInstance.get("");
    return response.data;
};

async function getObjectById(id: string): Promise<ResponseObject> {
    const response: AxiosResponse = await axiosInstance.get(`/${id}`);
    return response.data;
};

async function postAddObject(data: object): Promise<ResponseObject> {
    const response: AxiosResponse = await axiosInstance.post(``, data);
    return response.data;
};

async function putUpdateObject(id: string, data: object): Promise<ResponseObject> {
    const response: AxiosResponse = await axiosInstance.put(`/${id}`, data);
    return response.data;
};

async function patchUpdateObject(id: string, data: object): Promise<ResponseObject> {
    const response: AxiosResponse = await axiosInstance.patch(`/${id}`, data);
    return response.data;
};

async function deleteObject(id: string): Promise<object> {
    const response: AxiosResponse = await axiosInstance.delete(`/${id}`);
    return response.data;
};


// Get all objects
const allObjects = await getAllObjects();
console.log(allObjects);

// Create new object
const addedObject = await postAddObject({
    "name": "Google Pixel 9",
    "data": {
       "year": 2024,
       "price": 749.99,
       "color": "Obsidian",
       "capacity": "256 GB"
    }
});

console.log(addedObject);

// Get created object by ID
const objectId = addedObject.id;
console.log(await getObjectById(objectId));

// Put new data to the object
const editedObject = await putUpdateObject(objectId, {
    "name": "Google Pixel 9 (UPD)",
    "data": {
       "year": 2024,
       "price": 649.99,
       "color": "Wintergreen",
       "capacity": "256 GB"
    }
});
console.log(editedObject);


// Patch object with new data
const patchedObject = await patchUpdateObject(objectId, {
    "name": "test",
    "data": "test",
});
console.log(patchedObject);

// Delete object
console.log(await deleteObject(objectId));

