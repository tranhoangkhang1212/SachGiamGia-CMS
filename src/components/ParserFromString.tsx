import parse from 'html-react-parser';

interface IProps {
    value: string;
}

const ParserFromString: React.FC<IProps> = (props) => {
    const { value } = props;
    return <>{parse(value)}</>;
};

export default ParserFromString;
