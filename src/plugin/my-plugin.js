const myPlugin = (props = {hello: ""}) => (hook) => hook.init(() => {
    console.log(`hello ${props.hello}`);
});

export default myPlugin;
