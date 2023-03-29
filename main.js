"use strict";

let isReplying = false

/***
 * @param ms time duration in millisecond.
 * @returns {Promise<unknown>}
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const msgInputEl = document.getElementById("message-input")

function handleMsgInputKeydown(ev) {
    if (ev.which === 13 && !ev.shiftKey) {
        ev.preventDefault()

        if (isReplying) {
            return
        }

        const genRepMsg = randomReplyMsgGenerator()
        const userMsg = msgInputEl.value

        renderMsg("assets/anon-avatar.jpg", userMsg)

        isReplying = true
        renderMsg("assets/porpla.jpg", genRepMsg(userMsg), true)

        msgInputEl.value = "";
    }
}

msgInputEl.addEventListener("keydown", handleMsgInputKeydown)

/***
 * @param {string} imgSrc
 * @param {string} msg
 * @param {boolean} displayOneCharAtATime
 */
function renderMsg(imgSrc, msg, displayOneCharAtATime = false) {
    const ctnEl = document.createElement("div")
    const innerEl = document.createElement("div")
    const imgEl = document.createElement("img")
    const txtEl = document.createElement("div")

    txtEl.setAttribute("class", "message-inner-txt")
    innerEl.setAttribute("class", "message-inner")
    imgEl.setAttribute("src", imgSrc)
    imgEl.setAttribute("height", "32")
    imgEl.setAttribute("width", "32")
    innerEl.append(imgEl)
    innerEl.append(txtEl)
    ctnEl.append(innerEl)
    ctnEl.setAttribute("class", "message-container")

    if (displayOneCharAtATime) {
        txtEl.setAttribute("after-content-data", "▏")

        const timeout = Math.floor(Math.random() * 1000) + 500
        setTimeout(async () => {
            for (const c of msg.split("")) {
                await sleep(50)
                txtEl.innerHTML += c;
                chat.scrollTop = chat.scrollHeight
            }

            txtEl.removeAttribute("after-content-data")
            isReplying = false
        }, timeout)
    } else {
        txtEl.innerHTML = msg
    }

    const chat = document.getElementById("chat")
    chat.append(ctnEl)

    chat.scrollTop = chat.scrollHeight
}

/***
 * Generate random Pom reply message generator.
 * @returns {(function(string): string)}
 */
function randomReplyMsgGenerator() {
    const quotes = [
        "ไม่รู้",
        "แฮร่!",
        "สิ่งที่ท่านพูดมาไม่เป็นความจริง",
        "ไม่รู้ ไม่ทราบ โว๊ะ!",
        "พูดแบบนี้มาชกกันดีกว่า",
        "ไม่คิดถึงข้าวแดงแกงร้อน",
        "ผมก็เคยถูกซ่อมจนหมดสติ แต่ผมมันไม่ตายไง",
        "ผมเป็นคนคิด ห้ามนั่งแค็บและท้ายรถกระบะ",
        "จำนำข้าวเสียหายกี่แสนล้าน เรือดำน้ำซื้อแค่หมื่นกว่าล้าน เงินหมื่นกว่าล้านซื้อเรือดำน้ำได้ 50 ลำเลยไหม ไม่มีอะไรเสียหายเลย เสียเงินไปแต่ได้ของมา แต่จำนำข้าวหายไปหมดไม่ถึงตัวประชาชน",
    ]

    return function (inputMsg) {
        if (inputMsg.match("[a-zA-Z]")) {
            return "ภาษาอังกฤษ ผมไม่รู้เรื่อง"
        }

        return quotes[Math.floor(Math.random() * quotes.length)]
    }
}