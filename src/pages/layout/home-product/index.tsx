import BaseTab from '@/components/BaseTab';
import CreateSidebar from './create';
import View from './view';

const Sidebar = () => {
    const names = ['Tất cả', 'Tạo mới'];
    const components = [<View key={1} />, <CreateSidebar key={2} />];

    return <BaseTab names={names} components={components} />;
};

export default Sidebar;
