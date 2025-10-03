import { ComponentProps} from "react"
import Select, { components, MultiValue } from "react-select"
import { ColorValues } from "@/theme/theme";
import { getColourStyle } from "./MultiSelectStyle"
import { CustomMultiValueLabel, CustomOption } from "@/components/pages/order/Main/MainLeftSide/Admin/AdminPanel/Form/MultiSelect/SelectCompsants";

export type OptionMustHave = {color: ColorValues, value: string}

type MultiSelectProps<
    TOption extends OptionMustHave
> = 
    ComponentProps<typeof Select<TOption, true>>
    & { 
        name: string,
        Icon?: React.ReactNode,
        onFormSelectChange: React.ChangeEventHandler<HTMLSelectElement>,
    }

export const MultiSelect = <
    TOption extends OptionMustHave
> ({
    placeholder, 
    options, 
    Icon, 
    onFormSelectChange, 
    name,
...propsRest}: MultiSelectProps<TOption>) => {

    const handleSelectChange = ( 
        valuesSelected: MultiValue<TOption> ,
    ) => {
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
        placeholder={placeholder}
        onChange={handleSelectChange}
        styles={getColourStyle<TOption>()}
        components={{
           
            MultiValueLabel: CustomMultiValueLabel,
            Option: CustomOption,
            Control:({children, ...props}) => (
                <components.Control {...props}>
                    {Icon}
                    {children}
                </components.Control>
            )
        }}
        />
    )
}