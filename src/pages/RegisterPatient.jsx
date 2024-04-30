import { useState } from "react";
import { createPersonPatient } from "../api/admin";
import { Button, Card, Datepicker, Input, Label, Spinner} from "../components/ui";
import { Controller, get, set, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const RegisterPatient = () => {
  const { register, handleSubmit, control } = useForm();
  const [isLoading, setIsLoading] = useState(false);


  const submit = handleSubmit(async (data) => {
    setIsLoading(true);
    await createPersonPatient(data).then((res) => {
      console.log(res);
      console.log(res);
      toast.success(res.data.message);

    }).catch((err) => {
      console.log(err);
      toast.error(err.response.data.errorMessage);
    });
    setIsLoading(false);
  });

  return (
    <div>
      <Card>
        <h2 className="text-3xl font-bold my-4 text-center">Registrar Paciente</h2>
        <form onSubmit={submit} className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Nombre</Label>
            <Input
              type="text"
              placeholder="Cedula del paciente"
              {...register("person_na")}
            />
          </div>

          <div>
            <Label htmlFor="name">Apellido</Label>
            <Input
              type="text"
              placeholder="escriba el diagnóstico"
              {...register("person_la")}
            />
          </div>

          <div>
            <Label htmlFor="name">Cedula</Label>
            <Input
              type="number"
              placeholder="escriba el diagnóstico"
              {...register("person_ci")}
            />
          </div>

          <div>
            <Label htmlFor="name">Email</Label>
            <Input
              type="text"
              placeholder="escriba el diagnóstico"
              {...register("person_em")}
            />
          </div>

          <div>
            <Label htmlFor="person_fe_nac" className="mb-2">
              Fecha de nacimiento
            </Label>
            <Controller
              control={control}
              name="person_db"
              render={({ field }) => (
                <Datepicker
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  dateFormat="dd/MM/yyyy"
                />
              )}
            />
            {/* <Input type = "number" placeholder = "Fecha de nacimiento" {...register("edad")}/> */}
          </div>

          <div className='mt-2 col-span-2 flex justify-center items-center'>
              <Button>Registrar</Button>
            </div>
        </form>
      </Card>

      <Spinner isActive={isLoading} />
    </div>
  );
};

export default RegisterPatient;
