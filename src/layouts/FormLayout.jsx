import {Outlet, useLocation} from 'react-router-dom';

const FormLayout = () => {
    const location = useLocation();

    const getProgress = () => {
        if (location.pathname.includes('step-1')) return "33%";
        if (location.pathname.includes('step-2')) return "66%";
        if (location.pathname.includes('review')) return "100%";
    }
    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 border rounded-xl shadow-lg">
            <h2 className ="text-2xl font-bold mb-4"> Register</h2>
            <div className = " w-full bg-gray-200 h-2 mb-6 rounded-full overflow-hidden">
                <div className = "bg-primary h-full transition-all duration-500" style={{width: getProgress()}}>

                </div>

            </div>
            <div className = "bg-white p-4">
                <Outlet />
            </div>

        </div>
    )
}
export default FormLayout;