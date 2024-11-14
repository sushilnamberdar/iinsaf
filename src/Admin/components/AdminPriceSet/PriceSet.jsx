import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createOrUpdatePricing } from "../../../redux/AdminRedux/adminPriceSetSlicer"; // Assuming this is where your action is defined
import { baseUrl } from "../../../utils/const";

const PriceSet = () => {
  const dispatch = useDispatch();
  const [isEditable, setIsEditable] = useState(false);


  const toggleEditable = () => {
    setIsEditable(!isEditable);
  };

  const [formData, setFormData] = useState({
    views: "",
    minViews: "",
    maxViews: "",
    oneKView: "",
    adLength: "",
    self: "",
    iinsaf: "",
    conferencePrice: "",
    adType: [],
  });

  const [adTypeInput, setAdTypeInput] = useState({
    name: "",
    price: "",
  });

  // Fetch existing pricing data on component mount
  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const response = await fetch(`${baseUrl}getPricing`); // Adjust the endpoint as necessary
        if (!response.ok) {
          throw new Error("Failed to fetch pricing data");
        }
        const data = await response.json();
        setFormData({
          views: data.views || "",
          minViews: data.minViews || "",
          maxViews: data.maxViews || "",
          oneKView: data.oneKView || "",
          adLength: data.adLength || "",
          self: data.self || "",
          iinsaf: data.iinsaf || "",
          conferencePrice: data.conferencePrice || "",
          adType: data.adType || [], // Populate the adType array
        });
      } catch (error) {
        console.error("Error fetching pricing data:", error);
      }
    };

    fetchPricing();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdTypeChange = (e) => {
    const { name, value } = e.target;
    setAdTypeInput({ ...adTypeInput, [name]: value });
  };

  const handleAddAdType = () => {
    if (adTypeInput.name && adTypeInput.price) {
      setFormData((prevData) => ({
        ...prevData,
        adType: [...prevData.adType, { ...adTypeInput }],
      }));
      setAdTypeInput({ name: "", price: "" }); // Reset input fields
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createOrUpdatePricing(formData));
  };

  console.log(formData);
  return (
    <div className="bg-gray-100 flex items-center justify-center p-6 min-h-screen">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-4 sm:p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Price Set</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold block mb-2">Views</label>
            <input
              type="number"
              name="views"
              className="w-full p-2 border rounded"
              value={formData.views}
              onChange={handleChange}
              placeholder="Views"
            />
          </div>
          <div>
            <label className="font-semibold block mb-2">Min Views</label>
            <input
              type="number"
              name="minViews"
              className="w-full p-2 border rounded"
              value={formData.minViews}
              onChange={handleChange}
              placeholder="Min Views"
            />
          </div>
          <div>
            <label className="font-semibold block mb-2">Max Views</label>
            <input
              type="number"
              name="maxViews"
              className="w-full p-2 border rounded"
              value={formData.maxViews}
              onChange={handleChange}
              placeholder="Max Views"
            />
          </div>
          <div>
            <label className="font-semibold block mb-2">1K View</label>
            <input
              type="number"
              name="oneKView"
              className="w-full p-2 border rounded"
              value={formData.oneKView}
              onChange={handleChange}
              placeholder="1K View"
            />
          </div>
          <div>
            <label className="font-semibold block mb-2">Ad Length</label>
            <input
              type="number"
              name="adLength"
              className="w-full p-2 border rounded"
              value={formData.adLength}
              onChange={handleChange}
              placeholder="Ad Length"
            />
          </div>
          <div>
            <label className="font-semibold block mb-2">Self</label>
            <input
              type="number"
              name="self"
              className="w-full p-2 border rounded"
              value={formData.self}
              onChange={handleChange}
              placeholder="Self"
            />
          </div>
          <div>
            <label className="font-semibold block mb-2">Iinsaf</label>
            <input
              type="number"
              name="iinsaf"
              className="w-full p-2 border rounded"
              value={formData.iinsaf}
              onChange={handleChange}
              placeholder="Iinsaf"
            />
          </div>
          <div>
            <label className="font-semibold block mb-2">Conference Price</label>
            <input
              type="number"
              name="conferencePrice"
              className="w-full p-2 border rounded"
              value={formData.conferencePrice}
              onChange={handleChange}
              placeholder="Conference Price"
            />
          </div>
  
          {/* Ad Type Section */}
          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold pt-4">Ad Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold block mb-2">Ad Type Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full p-2 border rounded"
                  value={adTypeInput.name}
                  onChange={handleAdTypeChange}
                  placeholder="Ad Type Name"
                />
              </div>
              <div>
                <label className="font-semibold block mb-2">Ad Type Price</label>
                <input
                  type="number"
                  name="price"
                  className="w-full p-2 border rounded"
                  value={adTypeInput.price}
                  onChange={handleAdTypeChange}
                  placeholder="Ad Type Price"
                />
              </div>
              <div className="md:col-span-2 flex justify-center mt-4">
                <button
                  type="button"
                  onClick={handleAddAdType}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add Ad Type
                </button>
              </div>
            </div>
          </div>
  
          <div className="md:col-span-2">
            <h3 className="text-md font-semibold mt-4 mb-2">Current Ad Types</h3>
            <ul>
              {formData.adType.map((ad, index) => (
                <li key={index} className="p-2 bg-gray-200 rounded mb-1">
                  {ad.name}: ${ad.price}
                </li>
              ))}
            </ul>
          </div>
  
          <div className="md:col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Save Pricing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
};

const InputField = ({ label, type, name, value, onChange, placeholder }) => (
  <div className="flex flex-col">
    <label className="mb-1 text-sm font-medium text-black">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

export default PriceSet;
