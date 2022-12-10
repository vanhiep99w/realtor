import { useForm } from "react-hook-form";
import FieldWrapper from "@/components/FieldWrapper.jsx";
import ToggleField from "@/components/ToggleField.jsx";
import Spinner from "@/components/Spinner.jsx";
import { useEffect } from "react";

function FormListing({ defaultValues, onSubmit, submitButtonTitle }) {
  console.log(
    defaultValues || {
      type: "sell",
      name: "",
      beds: 1,
      baths: 1,
      parkingSpot: false,
      furnished: false,
      address: "",
      description: "",
      offer: false,
      price: 0,
      discount: 0,
      images: []
    }
  );
  const { register, watch, setValue, handleSubmit, reset } = useForm({
    defaultValues: defaultValues || {
      type: "sell",
      name: "",
      beds: 1,
      baths: 1,
      parkingSpot: false,
      furnished: false,
      address: "",
      description: "",
      offer: false,
      price: 0,
      discount: 0,
      images: []
    },
    shouldUseNativeValidation: true
  });

  useEffect(() => {
    // redux-hook-form just default data one time by default and cache it.
    // If want to reset default values need to use reset
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues]);
  const [type, parkingSpot, furnished, offer] = watch([
    "type",
    "parkingSpot",
    "furnished",
    "offer"
  ]);

  return (
    <div className="max-w-md mx-auto">
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <FieldWrapper
          title="Sell/Rent"
          render={() => (
            <ToggleField
              options={[
                { title: "Sell", value: "sell" },
                { title: "Rent", value: "rent" }
              ]}
              selectedValue={type}
              onChange={(value) => setValue("type", value)}
            />
          )}
        />

        <FieldWrapper
          title="Name"
          render={(id) => (
            <input
              {...register("name", { required: true })}
              className="input p-2"
              placeholder="Name"
              id={id}
            />
          )}
        />

        <div className="flex [&>*]:w-1/3 space-x-3">
          <FieldWrapper
            title="Beds"
            render={(id) => (
              <input
                {...register("beds", { min: 1, valueAsNumber: true })}
                className="input p-2 text-center"
                placeholder="Beds"
                type="number"
                id={id}
              />
            )}
          />

          <FieldWrapper
            title="Baths"
            render={(id) => (
              <input
                {...register("baths", { min: 1, valueAsNumber: true })}
                className="input p-2 text-center"
                placeholder="Baths"
                type="number"
                id={id}
              />
            )}
          />
        </div>

        <FieldWrapper
          title="Parking Spot"
          render={() => (
            <ToggleField
              options={[
                { title: "Yes", value: true },
                { title: "No", value: false }
              ]}
              onChange={(value) => {
                console.log(value);
                setValue("parkingSpot", value);
              }}
              selectedValue={parkingSpot}
            />
          )}
        />

        <FieldWrapper
          title="Furnished"
          render={() => (
            <ToggleField
              options={[
                { title: "Yes", value: true },
                { title: "No", value: false }
              ]}
              onChange={(value) => setValue("furnished", value)}
              selectedValue={furnished}
            />
          )}
        />

        <FieldWrapper
          title="Address"
          render={(id) => (
            <input
              {...register("address", { required: true })}
              placeholder="Address"
              className="input p-2"
              id={id}
            />
          )}
        />

        <FieldWrapper
          title="Description"
          render={(id) => (
            <input
              {...register("description", { required: true })}
              placeholder="Description"
              className="input p-2"
              id={id}
            />
          )}
        />

        <FieldWrapper
          title="Offer"
          render={() => (
            <ToggleField
              options={[
                { title: "Yes", value: true },
                { title: "No", value: false }
              ]}
              onChange={(value) => setValue("offer", value)}
              selectedValue={offer}
            />
          )}
        />

        <FieldWrapper
          title="Regular Price"
          render={(id) => (
            <div className="flex items-center space-x-5">
              <input
                {...register("price", {
                  required: true,
                  min: 1,
                  valueAsNumber: true
                })}
                className="input p-2 w-1/2"
                type="number"
                id={id}
              />
              <p className="flex-1">$ / Month</p>
            </div>
          )}
        />

        {offer && (
          <FieldWrapper
            title="Discounted Price"
            className="w-1/2"
            render={(id) => (
              <input
                {...register("discount", { valueAsNumber: true })}
                className="input p-2"
                type="number"
                id={id}
              />
            )}
          />
        )}

        <FieldWrapper
          title="Images"
          smallDescription="The first image will be the cover (max 6)."
          render={(id) => (
            <input
              {...register("images")}
              className="input"
              type="file"
              multiple={true}
              id={id}
              accept=".jpg,.png.jpeg"
            />
          )}
        />

        <button className="w-full-button bg-blue-600 text-white">
          {submitButtonTitle}
        </button>
      </form>
    </div>
  );
}

export default FormListing;
