

var Config = Object.assign(
    {
        Toast: {
            defaultProps: {
                position: 'bottom',
                textStyle: null,
                positionValue: 120,
                fadeInDuration: 500,
                fadeOutDuration: 500
            }

        }
    }
    ,
    global.config && global.config.widgets || {}
)


export default Config;