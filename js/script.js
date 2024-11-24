import { alert, notice, info, success, error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js'

const input= document.querySelector("#input")
const countryPlace = document.querySelector("#countryPlace")
const wrapper = document.querySelector(".wrapper")
const name = document.querySelector(".country-name")
const capital = document.querySelector(".capital")
const population =document.querySelector(".population")
const langList = document.querySelector(".langs")
const flag = document.querySelector(".flag")


let counter = 0

input.addEventListener("input", ()=>{
    const inputValue = input.value || "1"
    fetch(`https://restcountries.com/v3.1/name/${inputValue}`)
        .then(res => res.json()
        .then((post)=>{
            console.log(post);
            if(post.length > 1){
                
                for(let item of post){
                    counter ++
                    const chilItem = document.createElement("p")
                    chilItem.textContent = item.name.common
                    wrapper.appendChild(chilItem)
                    if(counter == 10){
                        break
                    }
                }
            }
            // countryPlace.textContent = post[0].name.common
            if(post.length === 1){
                wrapper.textContent = ""
                name.textContent = post[0].name.common
                capital.textContent = post[0].capital
                population.textContent = post[0].population
                flag.src = post[0].flags.svg
                const keyLanguages =Object.keys(post[0].languages)
                langList.innerHTML = ``
                for(let i = 0; i< keyLanguages.length; i++){
                    const lang = document.createElement("li")
                    lang.textContent = keyLanguages[i]
                    langList.appendChild(lang)

                }
            }

            if(post.length > 10){
                const myAlert = error({
                    title: 'Error',
                    text: 'Error.Too much countries found'
                ,}) ;
            }
        })
        
)
}) 