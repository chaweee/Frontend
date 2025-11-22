const Header = ({name}) => {
    return (
        <>
        <section className="container mx-auto px-4 py-2 bg-blue-300 rounded-lg shadow-md">
            <h1 className=" text-center text-9xl font-bold text-yellow-300">{name}</h1>
        </section>
        </>
    );
}

export default Header;