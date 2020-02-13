import React from "react";

import './BasketFunctions.css'

function Basket(list, MyJson){
    let i = 0;
    const seatOffers = MyJson["seatOffers"];
    console.log(list);
    var newList = [];
    for(let seg in list){
        console.log();
        for(let each in list[seg])
            newList.push(list[seg][each]);
    }
    console.log(newList);
    return <div className="basketList__container">
        <hr/>
        <ui>{
            newList.map(comp => {
                return <li className="basket__row" id={"basketRow" + i}>
                    <p className="basketSeat__title">SEAT: </p>
                    <div className="basketSeat__content">{comp["rowColumn"]}</div>
                    <p className="basketSeat__title">OFFER: </p>
                    <div className="basketSeat__content">{seatOffers[comp["offerKey"]]["name"]}</div>
                    <p className="basketSeat__title">PRICE: </p>
                    <div className="basketSeat__content">
                        {
                            (seatOffers[comp["offerKey"]]["priceBreakdown"]["value"]?
                                seatOffers[comp["offerKey"]]["priceBreakdown"]["value"]+" "+seatOffers[comp["offerKey"]]["priceBreakdown"]["currency"] :
                                "FREE")
                        }
                    </div>
                    <p className="basketSeat__title">PASSENGER: </p>
                    <div className="basketSeat__content">{seatOffers[comp["offerKey"]]["travelers"][seatOffers[comp["offerKey"]]["travelers"].length===1 ? 0 : i++ % seatOffers[comp["offerKey"]]["travelers"].length]}</div>
                </li>
            })
        }
        </ui>
        <hr/>
        <p id="basketTotal__total">Total:</p>
        <div className="basket__total">
            {BasketTotal(newList, seatOffers)}
        </div>
    </div>
}

function BasketTotal(list, seatOffers){
    let total = 0;
    let currency = "";
    if(list.length === 0)
        return <p>{total}</p>;
    else{
        for(let key in list)
        {
            total+= seatOffers[list[key]["offerKey"]]["priceBreakdown"]["value"];
            currency = seatOffers[list[key]["offerKey"]]["priceBreakdown"]["currency"] ? seatOffers[list[key]["offerKey"]]["priceBreakdown"]["currency"] : "";
        }
        total = Math.round(total * 100) / 100;
        return <p>{total+" "+currency}</p>;
    }
}

export default Basket