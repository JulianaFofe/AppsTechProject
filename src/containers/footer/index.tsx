const Footer = () => {
    return (
        <footer className="font-serif sm:gap-2 bg-amber-500 text-xl text-black mt-auto w-full fixed bottom-0 left-0">
            <div className="flex flex-wrap justify-center space-x-10 py-6">
                {/* Information Section */}
                <div>
                    <h1 className="font-bold text-2xl">Information</h1>
                    <ul>
                        <li>Return Policy</li>
                        <li>Support Policy</li>
                        <li>Private Policy</li>
                    </ul>
                </div>

                {/* Follow Us Section */}
                <div>
                    <h1 className="font-bold text-2xl">Follow us on</h1>
                    <p>Facebook</p>
                    <p>Twitter</p>
                    <p>Instagram</p>
                </div>

                {/* Opening Hours Section */}
                <div>
                    <h1 className="font-bold text-2xl">Opening Hours</h1>
                    <p>Monday to Friday</p>
                    <span>9:00am - 10:30pm</span>
                    <p>Saturday to Sunday</p>
                    <span>10:00am - 9:30pm</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
