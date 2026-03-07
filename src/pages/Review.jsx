import { useParams, useNavigate } from "react-router-dom";
import {useFormStore} from "../store/useFormStore";
import PreferredRecipeCard from "../components/preferrecipyCard";
const Review = ({login}) => {
    const {formData, resetForm} = useFormStore()
    const navigate = useNavigate();
    const handleNext = () => {
   alert("Congratulation!");
    localStorage.setItem("isLoggedIn", "true");
  resetForm();
login();
  navigate("/");
};
    return (
        <div>
            <div className = "flex flex-col gap-4">
                <h2 className="text-indigo-950 font-bold text-2xl">All set!, please check before summit</h2>
                <table className="table-fixed">

                <tbody>
                    <tr>
                        <td className=" border border-gray-400 p-4"> username</td>
                        <td  className=" border border-gray-400 p-4">{formData.username}</td>

                    </tr>
<tr>
                        <td  className=" border border-gray-400 p-4"> email</td>
                        <td  className=" border border-gray-400 p-4">{formData.email}</td>

                    </tr>
                    <tr>
                        <td className=" border border-gray-400 p-4"> Description</td>
                        <td className=" border border-gray-400 p-4">{formData.description}</td>

                    </tr>
                   <tr>
                    <td className="border border-gray-400 p-4">what you like</td>

                    <td className="border border-gray-400 p-4">
                        <div className = "flex flex-wrap gap-2">
                            {formData.preferRecipy.map((item, index) => (
                        <PreferredRecipeCard
                            item={item}
                            showonly={true}
                            key={index}
                        />
                        ))}
                        </div>

                    </td>
                    </tr>

                </tbody>
                </table>

            <div className="w-full flex justify-end gap-2">
                 <button
             className="text-white bg-gray-400 px-4 py-2 rounded-lg  font-bold transition duration-300 hover:bg-gray-400"
             onClick={() => navigate(-1)}
             > Previous step </button>
                <button
             className="text-white bg-primary/95 hover:bg-primary px-4 py-2  rounded-lg  font-bold transition duration-300 "
             onClick={handleNext}
             > Confirm & summit </button>
            </div>

        </div>
        </div>
    )


}
export default Review;