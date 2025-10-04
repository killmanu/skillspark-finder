import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import ProgressCircle from "@/components/ProgressCircle";
import StatCard from "@/components/StatCard";
import SkillBadge from "@/components/SkillBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Briefcase, Target, TrendingUp, Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function Dashboard() {
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const handleFileSelect = async (file: File) => {
    setAnalyzing(true);
    toast.loading("Analyzing your resume...", { id: "analysis" });

    // Simulate API call
    setTimeout(() => {
      setAnalyzing(false);
      setAnalysisComplete(true);
      toast.success("Analysis complete!", { id: "analysis" });
    }, 2000);
  };

  // Mock data for demo
  const mockData = {
    atsScore: 78,
    skillsExtracted: 12,
    matchedJobs: 45,
    skillGaps: 3,
    skills: [
      { name: "Python", level: "expert" as const },
      { name: "Machine Learning", level: "advanced" as const },
      { name: "React", level: "intermediate" as const },
      { name: "Data Analysis", level: "advanced" as const },
      { name: "SQL", level: "intermediate" as const },
      { name: "Docker", level: "beginner" as const },
    ],
    contact: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 234 567 8900",
    },
    experience: "5+ years in Software Development",
    education: "Bachelor's in Computer Science",
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 animate-scale-in">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">AI-Powered Resume Analysis</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Upload Your Resume
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Get instant ATS scoring, skill extraction, job matching, and personalized career guidance
        </p>
      </div>

      {/* Upload Section */}
      <div className="max-w-3xl mx-auto">
        <FileUpload onFileSelect={handleFileSelect} />
      </div>

      {/* Analysis Results */}
      {analysisComplete && (
        <div className="space-y-8 animate-slide-up">
          {/* Stats Overview */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="ATS Score"
              value={mockData.atsScore}
              icon={Target}
              variant="primary"
              description="Applicant Tracking System compatibility"
            />
            <StatCard
              title="Skills Found"
              value={mockData.skillsExtracted}
              icon={Sparkles}
              variant="success"
              description="Extracted from your resume"
            />
            <StatCard
              title="Matched Jobs"
              value={mockData.matchedJobs}
              icon={Briefcase}
              variant="default"
              description="Based on your skills"
            />
            <StatCard
              title="Skill Gaps"
              value={mockData.skillGaps}
              icon={TrendingUp}
              variant="warning"
              description="Areas for improvement"
            />
          </div>

          {/* Detailed Analysis */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* ATS Score Card */}
            <Card className="glass-card border shadow-lg">
              <CardHeader>
                <CardTitle>ATS Score Analysis</CardTitle>
                <CardDescription>How well your resume passes ATS systems</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <ProgressCircle value={mockData.atsScore} size={140} />
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {mockData.atsScore >= 85
                      ? "Excellent! Your resume is well-optimized."
                      : mockData.atsScore >= 70
                      ? "Good score. Some improvements recommended."
                      : "Needs improvement for better ATS compatibility."}
                  </p>
                  <Button className="w-full shadow-md">View Details</Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="glass-card border shadow-lg">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Extracted from your resume</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Name</p>
                  <p className="text-sm font-semibold">{mockData.contact.name}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Email</p>
                  <p className="text-sm font-semibold">{mockData.contact.email}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Phone</p>
                  <p className="text-sm font-semibold">{mockData.contact.phone}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Experience</p>
                  <p className="text-sm font-semibold">{mockData.experience}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Education</p>
                  <p className="text-sm font-semibold">{mockData.education}</p>
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="glass-card border shadow-lg">
              <CardHeader>
                <CardTitle>Extracted Skills</CardTitle>
                <CardDescription>Skills identified from your resume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {mockData.skills.map((skill) => (
                    <SkillBadge key={skill.name} skill={skill.name} level={skill.level} />
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <FileText className="w-4 h-4 mr-2" />
                  Export Skills List
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations */}
          <Card className="glass-card border shadow-lg">
            <CardHeader>
              <CardTitle>AI Recommendations</CardTitle>
              <CardDescription>Personalized suggestions to improve your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="jobs" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="jobs">Matched Jobs</TabsTrigger>
                  <TabsTrigger value="gaps">Skill Gaps</TabsTrigger>
                  <TabsTrigger value="courses">Courses</TabsTrigger>
                </TabsList>
                <TabsContent value="jobs" className="space-y-4 mt-4">
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors">
                        <h4 className="font-semibold">Senior Software Engineer</h4>
                        <p className="text-sm text-muted-foreground mt-1">Tech Corp • Remote • $120k-$150k</p>
                        <div className="flex gap-2 mt-2">
                          <SkillBadge skill="Python" variant="success" />
                          <SkillBadge skill="React" variant="success" />
                          <SkillBadge skill="Docker" variant="warning" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full">View All Jobs</Button>
                </TabsContent>
                <TabsContent value="gaps" className="space-y-4 mt-4">
                  <p className="text-sm text-muted-foreground">
                    Based on job market trends, here are skills to develop:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
                      <span className="font-medium">Kubernetes</span>
                      <SkillBadge skill="High Priority" variant="destructive" />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
                      <span className="font-medium">TypeScript</span>
                      <SkillBadge skill="Medium Priority" variant="warning" />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
                      <span className="font-medium">AWS</span>
                      <SkillBadge skill="Medium Priority" variant="warning" />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="courses" className="space-y-4 mt-4">
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold">Kubernetes for Developers</h4>
                            <p className="text-sm text-muted-foreground mt-1">Udemy • 12 hours • ⭐ 4.8</p>
                          </div>
                          <SkillBadge skill="$49" variant="default" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full">Browse All Courses</Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
