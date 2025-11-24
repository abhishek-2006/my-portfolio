export async function GET() {
  try {
    const res = await fetch(URL = "https://api.github.com/users/abhishek-2006/repos?sort=updated&direction=desc", {
      headers: {
        "User-Agent": "portfolio",
        'Authorization': `token ${process.env.GITHUB_TOKEN}`, 
        Accept: "application/vnd.github+json",
      },
      next: { revalidate: 3600 }, // cache for 1 hour
    });

    const repos = await res.json();

    const projects = await Promise.all(
      repos.map(async (repo) => {
        const langRes = await fetch(repo.languages_url, {
          headers: { "User-Agent": "portfolio-app" },
        });

        const languages = await langRes.json();
        const langs = Object.keys(languages);

        return {
          name: repo.name,
          description: repo.description,
          url: repo.html_url,
          liveUrl: repo.homepage || null,
          tech: langs.length ? langs : repo.topics || [],
        };
      })
    );

    return Response.json(projects);
  } catch (err) {
    console.error("GitHub Fetch Error:", err);
    return Response.json({ error: "Failed to load repos" }, { status: 500 });
  }
}
