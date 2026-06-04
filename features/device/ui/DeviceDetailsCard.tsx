import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card/Card'
import { MDMDeviceDetailsResponse } from '../types'

const DEVICE_DETAILS = {
    model: 'Samsung Galaxy S24',
    operatingSystem: 'Android 14',
    imei: '123456789012345',
    macAddress: '123456789012345',
    serialNumber: '123456789012345',
    mdmLastSyncAt: '2022-01-01 12:00:00',
    deviceStatus: 'ACTIVE',
    manufacturer: 'Samsung',
    zone: {
        address: '123 Main St, Anytown, USA',
        name: 'Home'
    },
    user: {
        name: 'John Doe',
        email: 'johndoe@example.com'
    }
}

export default function DeviceDetailsCard({ device }: { device: MDMDeviceDetailsResponse }) {

    return (
        <Card>
            <CardHeader>
                <CardTitle>Device Details</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Device Details</p>
            </CardContent>
        </Card>
    )
}
