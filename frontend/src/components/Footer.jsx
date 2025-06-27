import logo from '../assets/name.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faLine } from '@fortawesome/free-brands-svg-icons'
import { PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/solid'

function Footer() {
    return (
        <div className="px-6 py-4 text-sm mt-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                    <img src={logo} alt="icon" className="w-25 h-auto rounded" />
                    <div className="space-y-1">
                        <div className="flex items-center gap-1">
                            <PhoneIcon className="w-4 h-4" />
                            <span>080-xxx-xxxx</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <EnvelopeIcon className="w-4 h-4" />
                            <span>email@example.com</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6">         
                    <div className="flex items-center gap-10 xl:gap-5">
                        <FontAwesomeIcon icon={faFacebook} size="xl" />
                        <FontAwesomeIcon icon={faInstagram} size="xl" />
                        <FontAwesomeIcon icon={faLine} size="xl" />
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                        <a href="#" className="hover:underline">About Us</a>
                        <a href="#" className="hover:underline">How to Order</a>
                        <a href="#" className="hover:underline">FAQ</a>
                        <a href="#" className="hover:underline">Contact Us</a>
                    </div>
                </div>
            </div>
            <div className="mt-2 text-xs text-center text-gray-500">
                © 2025 TeeSHIRTy | Privacy Policy | Terms of Service
            </div>
        </div>


    )
}

export default Footer