import { useEffect, useState } from 'react';
import { Button, Card, Input, Label, Textarea, Spinner, Modal, Select, Datepicker } from '../../components/ui';
import { FaRegTrashAlt, FaUserPlus } from 'react-icons/fa';
import { MdOutlineModeEdit } from 'react-icons/md';
import { FaPersonRays } from "react-icons/fa6";
import { Controller, get, set, useForm } from 'react-hook-form';
import { createPerson, createTypePerson, deletePerson, deleteTypePerson, getAllPerson, getAllTypePerson, updatePerson } from '../../api/admin';

export const MantenimientoPersona = () => {

  const options = ["administrador", "user", "doctor", "paciente", "secretaria", "enfermera", "otro"] 


    const [people, setpeople] = useState([]);
    const [searchContent, setSearchContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [typePerson, setTypePerson] = useState([]);
    const [personEdit, setPersonEdit] = useState([{}]);

    const { register, handleSubmit, setValue, control } = useForm();

    useEffect(() => {
      getPeople();
    }, []);

    const getPeople = async () => {
      setIsLoading(true);
      await getAllPerson().then((res) => {
        setpeople(res.data);
        setIsLoading(false);
      });
    };

    // Para el segundo formulario
    const {
      register: registerPerson,
      handleSubmit: handleSubmitPerson,
      setValue: setValuePerson,
      control: controlPerson,
    } = useForm();
    
    
    //logica Para el modal tipo de persona
    const [modalTypePerson, setModalTypePerson] = useState(false);
    const [typePersonForEdit, setTypePersonForEdit] = useState("");
    
    useEffect(() => {
      //Reiniciar valores cada vez que se abre el modal
      if (!modalTypePerson) {
        setTypePersonForEdit("");
        setValue("typePerson_de", "");
      }
      //Obtener los tipos de persona solo si no hay ninguno
      if (modalTypePerson && typePerson.length <= 0) {
        console.log('Modal abierto');
        getTypePerson();
      }
    }, [modalTypePerson]);
  
    const typePersonSubmit = handleSubmit(async (data) => {
      setIsLoading(true);

      if (typePersonForEdit.length <= 0) {
        console.log('Creando tipo de persona');
        await createTypePerson(data).then((res) => {
          console.log(res.data);
          const newTypePerson = [...typePerson, res.data[0].type_person_de];
          setTypePerson(newTypePerson);
          setIsLoading(false);
          setModalTypePerson(false);
          //setTypePerson(res.data);
        });
      }
      
      if (typePersonForEdit.length > 0) {
        console.log('Editando tipo de persona');
        const body = {typePerson_de: data.typePerson_de, typersonForEdit: typePersonForEdit};
        await createTypePerson(body).then((res) => {
          console.log(res.data);
          const newTypePerson = typePerson.map((typePerson) => typePerson === typePersonForEdit ? data.typePerson_de : typePerson);
          setTypePerson(newTypePerson);
          setIsLoading(false);
          setModalTypePerson(false);
        });
      }
  
    });


    const getTypePerson = async () => {
      setIsLoading(true);
      getAllTypePerson().then((res) => {
        setTypePerson(res.data);
        setIsLoading(false);
      });
    }

    const dltTypePerson = async (typePersonForDelete) => {
      setIsLoading(true);
      deleteTypePerson(typePersonForDelete).then((res) => {
        const newTypePerson = typePerson.filter((typePerson) => typePerson !== typePersonForDelete);
        setTypePerson(newTypePerson);
        setIsLoading(false);
        setModalTypePerson(false);
      });
    }
    //aca termina la logica para el modal tipo de persona

    //logica para el modal de agregar persona
    const [modalAdd, setModalAdd] = useState(false);

    useEffect(() => {
      if (modalAdd && typePerson.length <= 0) {
        console.log('Modal abierto');
        getTypePerson();
      }
    }, [modalAdd]);


    const personSubmit = handleSubmitPerson(async (data) => {
      setIsLoading(true);
      if (!personEdit.person_id) {
        console.log('Creando persona');
        await createPerson(data).then((res) => {
          const newPeson = [...people, res.data[0]];
          setpeople(newPeson);
          console.log(res.data);
          setIsLoading(false);
          setModalAdd(false);
        });
      }
      if (personEdit.person_id === data.person_id) {
        console.log('Editando persona');


        const [year, month, day] = personEdit.person_db.split('-');
        const dateBirth = new Date(year, month - 1, day)

        const body = {
          person_na: data.person_na,
          person_la: data.person_la,
          person_ci: data.person_ci,
          person_em: data.person_em,
          person_fe_nac: isSameDay(data.person_fe_nac, dateBirth) ? formattedDate(dateBirth) : data.person_fe_nac,
          typePerson_de: data.typePerson_de,
          person_id: data.person_id
        }

        console.log(data.person_fe_nac);
        console.log(personEdit.person_db);
        console.log(formattedDate(dateBirth));
        console.log(dateBirth);

        console.log(body);

        await updatePerson(body).then((res) => {
          console.log(res.data);
          /*const newPeople = people.map((person) => person.person_id === personEdit.person_id ? res.data[0] : person);
          setpeople(newPeople);*/
          console.log(res.data);
          setIsLoading(false);
          setModalAdd(false);
        }); 
        
      }
    });

    const formattedDate = (date) => {
      date.setHours(0, 0, 0, 0);
      const formattedDate = date.toLocaleDateString('es-ES');
      return formattedDate;
  };

  const isSameDay = (date1, date2) => {
    if (!(date1 instanceof Date) || isNaN(date1)) {
      return false;
    }

    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
  };

    const openModalAdd = () => {
      setValuePerson("person_na", "");
      setValuePerson("person_la", "");
      setValuePerson("person_ci", "");
      setValuePerson("person_em", "");
      setValuePerson("person_fe_nac", "");
      setValuePerson("typePerson_de", "");
      setPersonEdit({});
      setModalAdd(true);

    }
    //logica para el modal de agregar persona


    const deletePersonById = async (id) => {
        await deletePerson(id).then((res) => {
          console.log(res.data);
          const newPeople = people.filter((person) => person.person_id !== id);
          setpeople(newPeople);
        });
    }

    const searchUser = async (searchContent) => {
        console.log(searchContent);
    };

  const calculateAge = (date) => {
    const [year, month, day] = date.split('-');
    const birthDate = new Date(year, month - 1, day); // Resta 1 al mes aquí

    const currentDate = new Date();

    let age = currentDate.getFullYear() - birthDate.getFullYear();

    const monthDifference = currentDate.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  return (
    <>
      <Card>
        <h1 className='text-xl text-center font-bold'>Matenimiento de Personas</h1>
        <div>
          <div className='flex justify-between' >
            <div className='invisible'>
              <input type="text" placeholder="Buscar Usuario" className="w-80 p-2 my-2" onChange={(e) => setSearchContent(e.target.value)}/>
              <button className="bg-blue-500 text-white p-2" onClick={() => searchUser(searchContent)}>Buscar</button>
            </div>

          <div className='flex justify-end gap-1 items-center'>
            <Button onClick={() => setModalTypePerson(true)}>
              <div className='flex items-center justify-center gap-1'>
                <FaPersonRays />
                Tipos de Personas
              </div>
            </Button>

            <Button onClick={() => openModalAdd()}>
              <div className='flex items-center justify-center gap-1'>
                <FaUserPlus /> 
                Agregar persona
              </div>
            </Button>
          </div>
          </div>
          <table className="w-full mt-3">
            <thead>
              <tr>
                <th >Nombre</th>
                <th >Apellido</th>
                <th >Cedula</th>
                <th >Email</th>
                <th >Edad</th>
                <th >Acciones</th>
              </tr>
            </thead>
            <tbody>
              {people.length > 0 ? people.map((usuario) => (
                <tr key={usuario.person_id}>
                  <td >{usuario.person_na}</td>
                  <td >{usuario.person_la}</td>
                  <td >{usuario.person_ci}</td>
                  <td >{usuario.person_em}</td>
                  <td >{calculateAge(usuario.person_db)}</td>
                  <td className='py-2 flex justify-around'>
                    <Button className='flex' onClick={() => {
                      setValuePerson("person_id", usuario.person_id);
                      setValuePerson("person_na", usuario.person_na);
                      setValuePerson("person_la", usuario.person_la);
                      setValuePerson("person_ci", usuario.person_ci);
                      setValuePerson("person_em", usuario.person_em);
                      const [year, month, day] = usuario.person_db.split('-');
                      setValuePerson("person_fe_nac", new Date(year, month - 1, day));
                      setValuePerson("typePerson_de", usuario.type_person_de);
                      setPersonEdit(usuario);
                      setModalAdd(true);
                    } } >
                      <MdOutlineModeEdit />
                      Editar
                    </Button>
                    <Button onClick={() => { deletePersonById(usuario.person_id) } }  className='flex bg-red-600 hover:bg-red-400'> 
                      <FaRegTrashAlt /> Eliminar
                      </Button>
                  </td>
                </tr>
              )) : <tr><td colSpan="4">No hay usuarios en la busqueda</td></tr>}
            </tbody>
          </table>
        </div>
      </Card>
      <Spinner isActive={isLoading} />


    {/* Modal para tipo persona */}
    <Modal openModal={modalTypePerson} btnClose={true} setCloseStatus={setModalTypePerson} resetValue={setTypePersonForEdit} >

    <div className='w-full'>
      <h2 className="text-3xl font-bold my-4 text-center">Tipos de Personas</h2>

      
      

      <Select label="Tipo de Persona" options={typePerson} 
      chooseOption={typePerson.length > 0 ? 'Selecciona un tipo de persona' : 'No hay tipo de personas registrado, por favor agregue uno'}
      returnValue={value => {
        setTypePersonForEdit(value);
        setValue("typePerson_de", value);
        } } />

    <div className='mt-3'>
      <Label htmlFor="name">{typePersonForEdit.length > 0 ? 'Editar el tipo de persona' : 'Agregar un tipo de persona'}</Label>
      <form onSubmit={typePersonSubmit} className='flex items-center gap-2'>
        <Input type = "text" placeholder = "Tipo de persona" {...register("typePerson_de")}/>
        <Button type="submit">Guardar</Button>
        {typePersonForEdit.length > 0 && 
        <Button type="button" className='flex bg-red-600 hover:bg-red-400' onClick={ () => dltTypePerson(typePersonForEdit)}>
          <FaRegTrashAlt /> Eliminar
        </Button>}
      </form>
    </div>


    </div>
    
    </Modal>

    {/* Modal para agregar persona */}

    <Modal openModal={modalAdd} btnClose={true} setCloseStatus={setModalAdd}>
      <div className='p-4'>
        <h2 className="text-3xl font-bold my-4 text-center">
          Agregar Persona
        </h2>

        <form className='mt-8' onSubmit={personSubmit}>
        <div className="grid grid-cols-2 gap-4">  

          <div>
            <Label htmlFor="name">Nombre</Label>
            <Input type = "text" placeholder = "Nombre" {...registerPerson("person_na")}/>
          </div>
          
          <div>
            <Label htmlFor="name">Apellido</Label>
            <Input type = "text" placeholder = "Apellido" {...registerPerson("person_la")}/>
          </div>
          
          <div>
            <Label htmlFor="name">Cedula</Label>
            <Input type = "text" placeholder = "Cedula" {...registerPerson("person_ci")}/>
          </div>
         
          <div>
            <Label htmlFor="name">Email</Label>
            <Input type = "email" placeholder = "Email" {...registerPerson("person_em")}/>
          </div>

          <Select label="Tipo de Persona" options={typePerson}  returnValue={value => {
            setValuePerson("typePerson_de", value);} } className="w-full"/>
          
          <div>
            <Label htmlFor="person_fe_nac" className="mb-2">Fecha de nacimiento</Label>
            <Controller
              control={controlPerson}
              name="person_fe_nac"
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
              <Button>Guardar</Button>
            </div>

        </div>
        </form>

      </div>
    </Modal>


    </>
  )
}