import { useParams, useNavigate } from "react-router-dom";
import {useFormStore} from "../store/useFormStore";
import PreferredRecipeCard from "../components/preferrecipyCard";
import { useState } from "react";
const Step2 = () => {
    const navigate = useNavigate();
    const {formData, updateFormData} = useFormStore();
    const keyword = [
  { name: "snacks", image: "/snacks.jpg" },
  { name: "sweet", image: "/sweets.jpg" },
  { name: "largeMeal", image: "/largeMeal.jpg" }
];
     const [iswarning, setIswarning] = useState(false);
    const toggleRecipe = (recipe) => {
        const name = recipe.name;

  if (formData.preferRecipy.some(r => r.name === name)) {
    updateFormData({
      preferRecipy: formData.preferRecipy.filter(r => r.name !== name)
    });
  } else {
    updateFormData({
      preferRecipy: [...formData.preferRecipy, recipe]
    });
  }
};
    const handleNext = () => {
  if (!formData.preferRecipy || !formData.description) {
    setIswarning(true);
    return;
  }
  navigate("/apply/review");
};
    return (
        <div className = "flex flex-col gap-4">
            <div className="w-full flex flex-col gap-4">
                 <span className = "font-bold">Tell us about yourself!</span>
                 <textarea  className="p-4 border border-zinc-400 rounded-lg"
                  value= {formData.description} onChange={(e) => updateFormData({description: e.target.value})} placeholder="Enter your exprience"/>
                 <span className = "font-bold">what recipy you would like to see?</span>
                <div className = "flex flex-wrap gap-2">

                        {keyword.map((item, index) => {
                      const isSelected = formData.preferRecipy.some(r => r.name === item.name);

                      return (
                        <div key={index} onClick={() => toggleRecipe(item)}>
                          <PreferredRecipeCard item={item} isSelected={isSelected} />
                        </div>
                      );
                    })}

                </div>
            </div>
            <div className = "flex flex-col gap-2  items-end justify-end">
                <div className="w-full flex justify-end gap-4">
                 <button
             className="text-white bg-gray-300 px-4 py-2 rounded-lg  font-bold transition duration-300 hover:bg-gray-400"
             onClick={() => navigate(-1)}
             > Previous step </button>
                <button
             className="text-white bg-primary/90 px-4 py-2 rounded-lg  font-bold transition duration-300 hover:bg-primary"
             onClick={handleNext}
             > Next step </button>

            </div>
{iswarning ?
             <div
             className ="text-red-500 text-sm"
             >Please fill all form</div>
             : ""}
            </div>

        </div>
    )


}
export default Step2;