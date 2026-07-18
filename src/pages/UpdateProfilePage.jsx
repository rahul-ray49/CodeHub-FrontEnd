import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../utils/axiosClient";
import NavigationBar2 from "./NavigationBar2";
import { Loader2, Upload, Save, ArrowLeft } from "lucide-react";
import {checkAuth} from "../authSlice"; 
import { useDispatch } from "react-redux";
function UpdateProfilePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ firstName: "", lastName: "", about: "", profileImage: null });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Fetch current user data to populate form
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosClient.get("/user/getProfileForUpdation");
        if (res?.data?.success) {
          const { firstName, lastName, about } = res.data.user;
          setFormData({ firstName:firstName||"", lastName:lastName||"", about:about||"", profileImage: null });
        }
      } catch (err) {
        console.error("Failed to load profile", err);
        alert(err?.response?.data?.message || "Failed to load profile");
      }
    };
    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed.");
      e.target.value="";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Maximum file size is 2MB.");
      e.target.value="";
      return;
    }

    setFormData((prev) => ({
      ...prev,
      profileImage: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.firstName.trim() === "") {
    alert("First name is required.");
    return;
  }

  if (formData.lastName.trim() === "") {
    alert("Last name is required.");
    return;
  }

  if (formData.about.trim() === "") {
    alert("About section is required.");
    return;
  }
    setLoading(true);

    const data = new FormData();
    data.append("firstName", formData.firstName.trim());
    data.append("lastName", formData.lastName.trim());
    data.append("about", formData.about.trim());
    if (formData.profileImage) data.append("profileImage", formData.profileImage);

    try {
      await axiosClient.put("/user/update-profile", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Profile updated successfully!");
      await dispatch(checkAuth());
      navigate("/profile/me");
    } catch (err) {
      alert(err?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      <NavigationBar2 />
      <div className="max-w-xl mx-auto py-8 px-6">
        <form onSubmit={handleSubmit} className="bg-[#0f172a] border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <button type="button" onClick={() => navigate(-1)} className="flex items-center text-slate-400 hover:text-white mb-6 text-sm">
            <ArrowLeft size={16} className="mr-2" /> Back
          </button>
          
          <h1 className="text-2xl font-bold mb-8">Update Profile</h1>

          <div className="space-y-4">
            <input type="text" name="firstName" value={formData?.firstName} onChange={handleInputChange} placeholder="First Name" className="w-full bg-[#0b1120] border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
            <input type="text" name="lastName" value={formData?.lastName} onChange={handleInputChange} placeholder="Last Name" className="w-full bg-[#0b1120] border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
            <textarea name="about" maxLength={300} value={formData?.about} onChange={handleInputChange} placeholder="Tell us about yourself..." className="w-full bg-[#0b1120] border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500 h-32" />
            <p className="text-xs text-slate-400 text-right">
                {formData?.about?.length}/300
            </p>
            <div className="border border-slate-700 border-dashed rounded-xl p-4 text-center cursor-pointer hover:bg-slate-800">
              <label className="flex flex-col items-center cursor-pointer">
                {formData?.profileImage ? (
                          <>
                            <img
                              src={URL.createObjectURL(formData?.profileImage)}
                              alt="Preview"
                              className="w-28 h-28 rounded-full object-cover mb-3 border-2 border-slate-600"
                            />

                            <span className="text-sm text-green-400">
                              {formData?.profileImage?.name}
                            </span>
                          </>
                        ) : (
                          <>
                            <Upload className="mb-2 text-slate-500" />
                            <span className="text-sm text-slate-400">
                              Upload Profile Image
                            </span>
                          </>
                        )}
                <input type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
              </label>
            </div>
          </div>

          <button type='submit' disabled={loading}
          className={`w-full mt-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2
                      ${
                      loading
                      ?
                      "bg-blue-500 opacity-60 cursor-not-allowed"
                      :
                      "bg-blue-600 hover:bg-blue-500 cursor-pointer"
                    }`}>
            {loading ? <Loader2
                  className="animate-spin"
                  size={18}
              /> : <><Save size={18}/> Save Changes</>}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfilePage;