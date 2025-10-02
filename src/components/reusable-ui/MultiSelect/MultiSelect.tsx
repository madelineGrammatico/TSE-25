import { ComponentProps, useEffect } from "react"
import Select, { components, ControlProps, GroupBase, MultiValue } from "react-select"
import { ColorValues } from "@/theme/theme";
import { getColourStyle } from "./MultiSelectStyle"

type OptionMustHave = {color: ColorValues, value: string}

type MultiSelectProps<
    TDomain extends {},
    TOption extends OptionMustHave
> = 
    ComponentProps<typeof Select<TOption, true>>
    & { 
        name: string,
        Icon?: React.ReactNode,
        onFormSelectChange: React.ChangeEventHandler<HTMLSelectElement>,
        domainObject: TDomain,
        setDomainObject:  React.Dispatch<React.SetStateAction<TDomain>>,
    }

export const MultiSelect = <
    TDomain extends {},
    TOption extends OptionMustHave
> ({
    placeholder, 
    options, 
    Icon, 
    onFormSelectChange, 
    name,
    domainObject, // (ex: Product, Menu, ...)
    setDomainObject,
...propsRest}: MultiSelectProps<TDomain, TOption>) => {
    
    useEffect(() => {
        if(!name) return 
        setDomainObject({...domainObject, [name]: options })
    }, [])

    const handleSelectChange = ( 
        newValue: MultiValue<TOption> ,
    ) => {
        const valuesSelected = newValue
            .map((option) => option.value)
        const fakeEvent = {
            target: {
                name,
                value: valuesSelected,
            }
        } as unknown as React.ChangeEvent<HTMLSelectElement>
        onFormSelectChange(fakeEvent)
    }
    const CustomControl = (props: ControlProps<TOption, true, GroupBase<TOption>>) => {
      const { children } = props
      return (
      <components.Control {...props}>
        {Icon}
        {children}
      </components.Control>
    )}
    return(
        <Select {...propsRest} 
        options={options}
        isMulti={true}
        closeMenuOnSelect={false}
        defaultValue={options as MultiValue<TOption>}
        placeholder={placeholder}
        onChange={handleSelectChange}
        styles={getColourStyle<TOption>()}
        components={{
            Control: CustomControl,
        }}
        />
    )
}