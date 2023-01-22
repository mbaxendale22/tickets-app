#!/bin/bash

echo "Enter a name for the new component:"
read dir_name

# Create the new directory with the user-specified name
cd src/ui/components
mkdir $dir_name


# Create index.ts file inside the main directory
cd $dir_name
touch index.ts
echo "export * from './views/$dir_name'" > index.ts

# Create the three subdirectories within the new directory
mkdir __tests__ views hooks

# in views create a folder with the same name as the component
cd views
touch $dir_name.tsx
echo "import React from 'react'

interface Props {
    myProp: string
}

export const $dir_name = (props: Props) => {
    const { myProp } = props
    return (
        <div>
            <p>{myProp}</p>
        </div>
    )
}
" > $dir_name.tsx

cd ../__tests__
touch $dir_name.test.tsx
touch $dir_name.test.tsx.snap

