import { useForm } from "react-hook-form";
import ToggleField from "@/components/ToggleField.jsx";
import FieldWrapper from "@/components/FieldWrapper.jsx";

function CreateListing() {
  const { register, watch, setValue, handleSubmit } = useForm({
    defaultValues: {
      type: "sell",
      name: "",
      numberOfBeds: 1,
      numberOfBaths: 1,
      parkingSpot: false,
      furnished: false,
      address: "",
      description: "",
      offer: false,
      price: 0,
      discount: 0,
      images: []
    }
  });

  const [type, parkingSpot, furnished, offer] = watch([
    "type",
    "parkingSpot",
    "furnished",
    "offer"
  ]);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <section className="p-3">
      <h1 className="text-2xl font-bold text-center">Create a Listing</h1>
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
                {...register("name")}
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
                  {...register("beds")}
                  className="input p-2"
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
                  {...register("baths")}
                  className="input p-2"
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
                onChange={(value) => setValue("parkingSpot", value)}
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
                {...register("address")}
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
                {...register("description")}
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
                  {...register("price")}
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
                  {...register("discount")}
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
            Create Listing
          </button>
        </form>
      </div>
    </section>
  );
}

export default CreateListing;
