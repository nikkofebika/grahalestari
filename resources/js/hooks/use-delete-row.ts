import { useForm } from '@inertiajs/react';

type Props = {
    routeName: string;
};
export default function useDeleteRow({ routeName }: Props) {
    const { delete: destroy, processing: isDeleting } = useForm();

    const handleRowDelete = (id: number) => {
        destroy(route(routeName, id), {
            onSuccess: () => {
                // setSelectedData({
                //     id: undefined,
                //     name: undefined,
                // });
            },
        });
    };

    return {
        handleRowDelete,
        isDeleting,
    };
}
