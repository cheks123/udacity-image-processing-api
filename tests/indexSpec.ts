import router from "../src/routes/index";
import sendImage from "../src/utils/send_image";
import resizeImage from "../src/utils/resize_image";





describe("A suit to test tha image processing API", () =>{
    it("checks that sendImage is defined", () =>{
        expect(sendImage).toBeDefined()
    })

    it("checks that resizeImage is defined", () =>{
        expect(resizeImage).toBeDefined()
    })

    it("checks that sendImage is a function", () =>{
        expect(typeof sendImage).toEqual('function')
    })

    it("checks that resizeImage is a function", () =>{
        expect(typeof resizeImage).toEqual('function')
    })

})

