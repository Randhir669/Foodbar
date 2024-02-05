import React from 'react'

export default function Footer() {

    return (
        <>

            <div class="footer">

                <div class="content">
                    <div class="services">
                        <h4>Services</h4>
                        <p>Food Order</p>
                        <p>Food Delivery</p>
                    </div>

                    <div class="links">
                        <h4>Quick links</h4>
                        <p><a href="/SignIn">Login</a></p>
        
                        <p>About</p>
                    </div>
                    <div class="details">
                        <h4 class="address">Address</h4>
                        <p>
                            Kolkata, India
                        </p>
                        <h4 class="mobile">Mobile</h4>
                        <p>+91-8250347078</p>
                        <h4 class="mail">Email</h4>
                        <p>gocoders4u@gmail.com</p>
                    </div>
                </div>
                <footer>
                    <hr />
                    Copyright © 2023 <a href="https://foodiebar.netlify.app" style={{ color: "white", textDecoration: "underline" }}>foodbar.com</a> All rights reserved
                </footer>

            </div>

        </>
    )
}
