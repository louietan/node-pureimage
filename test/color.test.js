import chai, {expect} from "chai"

import * as pureimage from "../src/index.js"
import {OPAQUE_BLACK} from '../src/named_colors.js'

describe('color',() => {
    let image
    let context

    beforeEach(() => {
        image = pureimage.make(200,200)
        context = image.getContext('2d')
    })

    it('canvas is empty and clear', (done) => {
        expect(image.getPixelRGBA(0,0)).to.eq(OPAQUE_BLACK)
        done()
    })

    it('fillcolor_hex', (done)=>{
        context.fillStyle = '#000000'
        context.fillRect(0,0,200,200)
        expect(image.getPixelRGBA(0,0)).to.eq(0x000000FF)
        done()
    })

    it('fillcolor_hex_3', (done)=>{
        function fill_check(hex_string, num) {
            context.fillStyle = hex_string
            context.fillRect(0,0,200,200)
            expect(image.getPixelRGBA(0,0)).to.eq(num)
        }

        fill_check('#000000',0x000000FF)
        fill_check('#888888',0x888888FF)
        fill_check('#AABBCC',0xAABBCCFF)
        fill_check('#ABC',0xAABBCCFF)
        fill_check('#000000',0x000000FF) //reset to black
        fill_check('#FFFFFF88',0x888888ff) //draw 50% white, turns into gray
        done()
    })

})
