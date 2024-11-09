import Button from "./Button";
import Generator from "./Generator";
import Dropdown from "./Dropdown";

function AddPasswordForm() {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Add New Password</h2>
      <form>
        {/* Form Inputs */}
        <div className="mb-4">
          <label className="block mb-1">Service Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter service name"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter username"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter password"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Website Address</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter website name"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Category</label>
          <Dropdown />
          {/* Input */}
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Select a Category"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <Button
            type="submit"
            className="px-4 py-2 rounded text-white bg-blue-500 text-[12px]"
          >
            Save
          </Button>

          <Button
            type="button"
            className="px-4 py-2 text-white bg-green-500 rounded"
          >
            <Generator />
            Generate Password
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddPasswordForm;
