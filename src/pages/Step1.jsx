import { useParams, useNavigate } from "react-router-dom";
import {useFormStore} from "../store/useFormStore";
import { useState } from "react";
const Step1 = () => {
    const navigate = useNavigate();
    const {formData, updateFormData} = useFormStore();
    const [iswarning, setIswarning] = useState(false);
    const handlenext = ()=>{
         if (!formData.username || !formData.password || !formData.email) {
    setIswarning(true);
    return;
  }
  navigate("/apply/step-2");
    }
    return (
        <div className = "flex flex-col gap-4">
            <div className="w-full grid grid-cols-[120px_1fr] gap-4 items-center">

                    <span>Username: </span>
                    <input
                    className="p-2 border border-zinc-400 rounded-lg w-full"
                    type="text"
                    value={formData.username}
                    onChange={(e) =>
                        updateFormData({ username: e.target.value })
                    }
                    placeholder="Enter your Username"
                    />



                    <span>Email: </span>
                    <input
                    className="p-2 border border-zinc-400 rounded-lg w-full"
                    type="text"
                    value={formData.password}
                    onChange={(e) =>
                        updateFormData({ password: e.target.value })
                    }
                    placeholder="Enter your Email"
                    />


                    <span>Password: </span>
                     <input
                     className="w-full p-2 border border-zinc-400 rounded-lg"
                     type="text"
                     value= {formData.email}
                     onChange={(e) => updateFormData({email: e.target.value})}
                     placeholder="Enter your Password"/>




            </div>


            <div className="w-full flex  flex-col items-end justify-end gap-1 ">
                <button
             className="text-white bg-primary/90 dark:bg-primary-dark/90 dark:hover:bg-primary-dark hover:bg-primary transition-all  px-4 py-2 rounded-lg  font-bold"
             onClick={handlenext}
             > Next step </button>
             {iswarning ?
             <div
             className ="text-red-500 text-sm"
             >Please fill all form</div>
             : ""}
            </div>

        </div>
    )


}
export default Step1;