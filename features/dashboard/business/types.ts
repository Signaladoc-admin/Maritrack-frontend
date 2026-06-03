export interface BusinessDashboardAppsResponse {
    code: 200,
    data: {
        time: number,
        managerAppVersions: {
            x: string[],
            y: string[],
            title: string,
            chartType: string,
            description: string | null
        }
    }
}

interface ChartData {
    x: string[],
    y: string[],
    title: string,
    chartType: string,
    description: string | null
}

interface DeviceLocation {
    id: string,
    label: string,
    lat: number,
    lng: number,
    time: number
}

export interface BusinessDashboardDevicesResponse {
    code: number,
    data: {
        time: number,
        validUntil: number,
        total: number,
        offline: number,
        online: number,
        active: number,
        locked: number,
        portalVersion: string,
        osVersions: ChartData,
        buildVersions: ChartData,
        newDevices: ChartData,
        deviceLocations: DeviceLocation[]
    }
}

export interface BusinessDashboardUsageResponse {
    code: 200,
    data: {
        time: number,
        storageData: ChartData,
        wifiUsageData: ChartData,
        mobileUsageData: ChartData,
    }
}