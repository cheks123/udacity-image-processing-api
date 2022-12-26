import resizeImage from "../src/utils/resize_image";
import supertest from "supertest";
import app from "../src";
import path from 'path';


const request = supertest(app);

describe("A suit to test tha image processing API", () =>{
    
    it("checks that resizeImage is defined", () =>{
        expect(resizeImage).toBeDefined()
    })


    it("checks that resizeImage is a function", () =>{
        expect(typeof resizeImage).toEqual('function')
    })

    it("tests to ensure that resizeImage returns an object", () => {
        const file_path = path.join(__dirname, '../full/palmtunnel.jpg');
        expect(typeof resizeImage(file_path, 'palmtunnel', 300, 300)).toBe('object')
    })

   
})


describe("A suit to test tha API endpoints", () =>{
    

    it("checks to ensure the endpoint returns status code 200", async () => {
        const response = await request.get('/api');
        expect(response.status).toBe(200);
        
    });

    it("checks to see that the endpoint with query parameter returns status code 200",
        async () => {
            const response = await request.get('/api/image?image=palmtunnel&width=300&height=300');
            expect(response.status).toBe(200);
            
        });

});

