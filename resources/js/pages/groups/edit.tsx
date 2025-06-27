import CreateUpdatePageHeading from '@/components/headings/create-update-page-heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TCreateGroup, TGroup } from '@/types/group';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import GroupForm from './form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Groups',
        href: '/groups',
    },
    {
        title: 'Update',
        href: '',
    },
];

type Props = {
    group: TGroup;
};
export default function GroupCreate({ group }: Props) {
    const form = useForm<TCreateGroup>({
        name: group.name,
        email: group.email,
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        form.put(route('groups.update', group), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateUpdatePageHeading title="Edit Group" backUrl="/groups" />
            <GroupForm onSubmit={submit} useForm={form} submitTitle="Update" />
        </AppLayout>
    );
}
