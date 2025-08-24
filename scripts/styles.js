// Apply classNames based on data- properties in index.html
function updateResponsive () {
    const width = window.innerWidth
    let deviceType = ''

    // check deviceType based on width
    if (width < 768) {
        deviceType = 'mobile'
    } else if (width >= 768 && width < 1024) {
        deviceType = 'tablet'
    } else {
        deviceType = 'desktop'
    }

    // collect all data attributes
    const dataElements = document.querySelectorAll('[data-mobile], [data-tablet], [data-desktop]')

    dataElements.forEach(ele => {
        const targetClass = ele.getAttribute(`data-${deviceType}`)

        // remove all text-preset classes
        const currentClasses = ele.className.split(' ')
        const newClasses = currentClasses.filter(cls => 
            !cls.startsWith('mobile-text-preset-') &&
            !cls.startsWith('tablet-text-preset-') &&
            !cls.startsWith('desktop-text-preset-')
        )
        
        // add the current text-preset class to the remaining classes
        if (targetClass) {
            newClasses.push(targetClass)
        }
        
        // 更新类名（保留所有原有类，只替换文本预设类）
        ele.className = newClasses.join(' ')
    })
}

// the function should run as soon as the DOMContent is loaded
document.addEventListener('DOMContentLoaded', function () {
    updateResponsive()

    // add debounce to avoid repetitive updates
    let resizeTimer
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer)
        resizeTimer = setTimeout(updateResponsive, 100)
    })
})