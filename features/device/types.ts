interface DeviceDetails {
    id: string,
    serialNumber: string,
    imei: number,
    mdmDeviceId: string,
    mdmId: string,
    macAddress: string,
    manufacturer: string,
    assignmentStatus: string,
    mdmEnrollmentStatus: string,
    mdmComplianceStatus: string | null,
    lastSeenAt: string | null,
    lastKnownLocation: string | null,
    deviceStatus: string,
    flagged: boolean,
    flagReason: string | null,
    flaggedByUserId: string | null,
    flaggedAt: string | null,
    mdmLastSyncAt: string,
    createdAt: string,
    updatedAt: string,
    deleted: boolean,
    deletedAt: string | null,
    currentUserId: string | null,
    childId: string | null,
    model: string | null,
    operatingSystem: string | null,
    currentDepartmentId: string | null,
    currentLocationId: string | null,
    businessId: string
}

interface RealTimeStats {
    brightnessLevel: number,
    cpuUtilization: number,
    memoryUsed: number,
    powerOnTime: number,
    selEnforced: boolean,
    gsfInstalled: boolean,
    numCameras: number,
    activeCameraId: string,
    deviceTemperature: number,
    batteryTemperature: number,
    batteryVoltage: number,
    batteryHealth: string,
    batteryLevel: number,
    batteryStatus: string,
    lastChargerPluggedTime: number,
    gpsEnabledType: string,
    wifiEnabled: boolean,
    wifiSSID: string,
    wifiMacAddr: string,
    internalStorageUsed: number,
    internalStorageFree: number,
    sdCardInserted: boolean,
    sdCardSize: number,
    sdCardUsed: number,
    sdCardUsedPercent: number,
    currentSystemTime: number,
    deviceRingerMode: number,
    screenOrientationMode: number,
    currentLocale: string,
    appMemoryUsed: number,
    appMemoryAvailable: number,
    subscriptionExpiryDate: number,
    lastSubscriptionExpiredDate: number,
    rxBytes: number,
    txBytes: number,
    rxBytesMobile: number,
    txBytesMobile: number,
    totalUsedBytes: number,
    internalStorageUsedPercent: number,
    powerSaveMode: boolean,
    deviceIdleMode: boolean,
    appUsageData: [
        {
            mPackageName: string,
            mFgUsageTime: number,
            lastUsedTime: number
        },
        {
            mPackageName: string,
            mFgUsageTime: number,
            lastUsedTime: number
        },
        {
            mPackageName: string,
            mFgUsageTime: number,
            lastUsedTime: number
        },
        {
            mPackageName: string,
            mBgUsageTime: number,
            wifiUsageBytes: number,
            dataUsageBytes: number
        },
        {
            mPackageName: string,
            mBgUsageTime: number,
            wifiUsageBytes: number,
            dataUsageBytes: number
        },
        {
            mPackageName: string,
            wifiUsageBytes: number,
            dataUsageBytes: number
        },
        {
            mPackageName: string,
            wifiUsageBytes: number,
            dataUsageBytes: number
        },
        {
            mPackageName: string,
            wifiUsageBytes: number,
            dataUsageBytes: number
        },
        {
            mPackageName: string,
            wifiUsageBytes: number,
            dataUsageBytes: number
        },
        {
            mPackageName: string,
            wifiUsageBytes: number,
            dataUsageBytes: number
        },
        {
            mPackageName: string,
            wifiUsageBytes: number,
            dataUsageBytes: number
        },
        {
            mPackageName: string,
            wifiUsageBytes: number,
            dataUsageBytes: number
        },
        {
            mPackageName: string,
            wifiUsageBytes: number,
            dataUsageBytes: number
        },
        {
            mPackageName: string,
            wifiUsageBytes: number
        },
        {
            mPackageName: string,
            wifiUsageBytes: number
        },
        {
            mPackageName: string,
            wifiUsageBytes: number
        },
        {
            mPackageName: string,
            wifiUsageBytes: number
        },
        {
            mPackageName: string,
            wifiUsageBytes: number
        },
        {
            mPackageName: string,
            wifiUsageBytes: number
        },
        {
            mPackageName: string
        }
    ],
    deviceDataUsage: number,
    deviceWiFiUsage: number,
    currentTimeZone: string,
    currLauncher: string,
    currIme: string,
    currSMS: string,
    currDialer: string
}

export interface MDMDeviceDetailsResponse {
    code: number,
    message: string,
    data: {
        id: string,
        osType: string,
        deviceInitTime: number,
        gcmId: string,
        imeiNumber: string,
        deviceId: string,
        lastReportedTime: number,
        createdTime: number,
        realTimeStats: RealTimeStats,
        serialNumber: string,
        bluetoothMacAddr: string,
        wifiMacAddr: string,
        version: string,
        manufacturer: string,
        model: string
    },
    deviceDetails: DeviceDetails
}