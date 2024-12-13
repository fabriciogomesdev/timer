import { HandPalm, Play } from "phosphor-react";
import {  HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";
import { zodResolver} from '@hookform/resolvers/zod';
import { FormProvider, useForm } from "react-hook-form";
import * as zod from 'zod';
import { useContext } from "react";
import { NewCycleForm } from "./NewCycleForm";
import { Countdown } from "./Countdown";
import { CyclesContext } from "../../contexts/CyclesContext";



const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number().min(1, "O ciclo deve ter no mínimo 5 minutos").max(60, "O ciclo deve ter no máximo 60 minutos"),

})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home(){
    const {createNewCycle, interruptCurrentCycle, activeCycle} = useContext(CyclesContext)
   
    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            minutesAmount: 0,
            task: '',
        }
    })

    const {handleSubmit, watch, reset} = newCycleForm
    
    
    
    const task = watch('task')
    
    const isSubmitDisabled = !task
    
    function handleCreateNewCycle(data: NewCycleFormData ){ 
        createNewCycle(data)
        reset()
    }
    

    return (
        <HomeContainer>
        <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
            
            
            
            <FormProvider {...newCycleForm}>
                <NewCycleForm />
            </FormProvider>
            <Countdown />

        
        
        { activeCycle ? (
            <StopCountdownButton onClick={interruptCurrentCycle} type="button">
            <HandPalm size={24}/>
                Interromper
            </StopCountdownButton>
        ) : (
            <StartCountdownButton disabled={isSubmitDisabled} type="submit">
        <Play size={24}/>
            Começar
        </StartCountdownButton>
        )}
        </form>
    </HomeContainer>
    );
}