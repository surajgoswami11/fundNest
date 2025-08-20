import AuthWrapper from "@/components/AuthWrapper";

export default function DashboardLayoutWrapper({ children }) {
    return (
        <AuthWrapper>
            {children}
        </AuthWrapper>
    );
}