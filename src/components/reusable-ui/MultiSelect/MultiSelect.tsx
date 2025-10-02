import { ComponentProps, useEffect,
    //  useState 
    } from "react"
import Select, { 
    MultiValue, 
    // OnChangeValue 
} from "react-select"

type MultiSelectProps<T extends {}> = 
    ComponentProps<typeof Select<unknown, true>>
    & { 
        name: string,
        Icon?: React.ReactNode,
        onFormSelectChange: React.ChangeEventHandler<HTMLSelectElement>,
        domainObject: T,
        setDomainObject:  React.Dispatch<React.SetStateAction<T>>,
    }

export const MultiSelect = <T extends {}> ({
    placeholder, 
    options, 
    Icon, 
    onFormSelectChange, 
    name,
    domainObject, // (ex: Product, Menu, ...)
    setDomainObject,
...propsRest}: MultiSelectProps<T>) => {
    // const { isFormSubmitted, setFormSubmitted } = useState(false)
    
    useEffect(() => {
        if(!name) return 
        setDomainObject({...domainObject, [name]: options })
    }, [])
    
    function isOptionWithValue (object: unknown): object is { value: string } {
         return typeof object === "object" && object !== null && "value" in object
    }

    const handleSelectChange = ( 
        newValue: MultiValue<unknown> ,
        //  newValue: OnChangeValue<unknown, true> ,
    ) => {
        const valuesSelected = newValue
            .filter(isOptionWithValue)
            .map((option) => option.value)
        const fakeEvent = {
            target: {
                name,
                value: valuesSelected,
            }
        } as unknown as React.ChangeEvent<HTMLSelectElement>
        onFormSelectChange(fakeEvent)
    }

    return(
        <Select {...propsRest} 
        options={options}
        isMulti={true}
        closeMenuOnSelect={false}
        defaultValue={options}
        placeholder={placeholder}
        onChange={handleSelectChange}
        />
    )
}