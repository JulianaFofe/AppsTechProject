const Footer = () => {
    return (
        <div className="font-serif sm:gap-2">
            <div className="flex justify-center space-x-10 mt-20 bg-amber-500 text-xl">
                <div>
                    <h1 className="font-bold text-2xl">Information</h1>
                    <ul>
                        <li>
                            Return Policy
                        </li>
                        <li>
                            Support Policy
                        </li>
                        <li>
                            Private Policy
                        </li>
                    </ul>
                </div>

                <div>
                    <h1 className="font-bold text-2xl">Follow us on</h1>
                    <p>Facebook</p>
                    <p>twitter</p>
                    <p>Instagram</p>
                </div>

                <div>
                    <h1 className="font-bold text-2xl">Opening Hours</h1>
                    <p>Monday to Friday</p>
                    <span>9:00am - 10:30pm</span> 
                    <p>Saturday to Sunday</p>
                    <span>10:00am - 9:30pm</span>
                </div>
            </div>
        </div>
    )
}

export default Footer