import { ComponentProps, useState } from "react"
import Select, { ActionMeta, MultiValue, OnChangeValue } from "react-select"

type MultiSelectProps = 
    ComponentProps<typeof Select<unknown, true>>
    & {
        Icon?: React.ReactNode,
        onFormValuesChange: React.ChangeEventHandler<HTMLSelectElement>,
    }
type Option = {
    value: string,
    label: string
}
export const MultiSelect = ({
    placeholder, 
    options, 
    Icon, 
    onFormValuesChange, 
    name, 
...propsRest}: MultiSelectProps) => {
    const {} = useState()

    function isOptionWithValue (object: unknown): object is { value: string } {
         return typeof object === "object" && object !== null && "value" in object
    }

    const handleSelectChange = ( 
        newValue: MultiValue<unknown> ,
        //  newValue: OnChangeValue<unknown, true> ,
        actionMeta: ActionMeta<unknown>
    ) => {
        const valuesSelected = newValue
            .filter(isOptionWithValue)
            .map((option) => option.value)
        console.log("name props: ", name)
        const fakeEvent = {
            target: {
                name,
                value: valuesSelected,
            }
        } as unknown as React.ChangeEvent<HTMLSelectElement>
        onFormValuesChange(fakeEvent)
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