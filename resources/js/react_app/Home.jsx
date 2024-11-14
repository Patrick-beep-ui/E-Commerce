import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function Home() {
    useEffect(function () {
        const body = document.querySelector("body")
        body.className = ""
    }, [])
    return (
        <>
            <Header />
            <div className="back-img">
                <h2>Design That Inspires</h2>
            </div>
            <main className="shop container">
                <section className="goal section">
                    <div className="goal title">
                        <h3>Our Goal</h3>
                        <p>In a world where convenience is key, our app is designed to be your one-stop-shop for everything related to furniture!</p>
                    </div>
                    <div className="goal-images">
                        <img src="/img/living-img1.jpg" alt="" className="product-img" />
                        <img src="/img/living-img2.jpg" alt="" className="product-img" />
                        <img src='/img/living-img6.jpg' alt="" className="product-img"/>
                    </div>
                </section>
                <section className="description section">
                    <div className="description title flex">
                        <h3>Our Service</h3>
                        <p>Streamline the purchase process. Access a diverse range of high-quality products anytime, anywhere.</p>
                    </div>
                    <div className="description-image">
                        <img src="img/description-image3.jpg" alt="" />
                    </div>
                    <h4><Link id="catalog-link" to={'/catalog'}>Go to Catalog
                        <span className="svg svg__arrow" aria-hidden="true">
                            <svg aria-hidden="true" focusable="false" role="presentation" enableBackground="new -19 23 66 16" viewBox="-19 23 66 16" xmlns="http://www.w3.org/2000/svg">
                                <path d="m-19 29.6h64v2.9h-64z"></path>
                                <path d="m47 31-2-2-6-6-2 2 5.9 6-5.9 6 2 2 6-6z"></path>
                            </svg>
                        </span>
                    </Link></h4>
                </section>
            </main>
                <Footer/>
            <script src="main.js"></script>

        </>
    )
}
