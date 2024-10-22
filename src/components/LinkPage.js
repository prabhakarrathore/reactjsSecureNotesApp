import { Link } from "react-router-dom"

const LinkPage = () => {
    return (
        <div className=" min-h-screen linkBG">
            <div className="relative isolate">
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                            Notes App
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Welcome to Notes App! Your new space for capturing ideas, to-dos, and everything in between. Let’s get started on organizing your thoughts!
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link className="text-sm font-semibold leading-6 text-gray-900" to="/login">Login</Link>
                            <br />
                            <Link
                                className="rounded-md bg-gray-200 px-4 p-2 text-sm font-semibold text-black shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300"
                                to="/register" >Register</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LinkPage
